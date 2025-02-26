from kubernetes import client
import json
from kubernetes.stream import stream
from backend.kubernetes_mng.kubernetes_client_manager import KubernetesClientManager

class KubernetesPod:
    def __init__(self, pod: client.V1Pod):
        """
        初始化 Kubernetes Pod 对象
        
        :param pod: V1Pod 实例
        """
        self.pod = pod
        self.core_v1_api = KubernetesClientManager.get_instance().get_core_v1_api()

    def get_directory_structure(self, directory: str = "/home/developer"):
        """
        获取指定 Pod 中的目录结构
        
        :param directory: 目录路径
        :return: 目录结构的列表
        """
        exec_command = ['tree', directory]
        try:
            response = stream(
                self.core_v1_api.connect_get_namespaced_pod_exec,
                self.pod.metadata.name,
                self.pod.metadata.namespace,
                command=exec_command,
                stderr=True,
                stdin=False,
                stdout=True,
                tty=False
            )
            response = response.decode('utf-8')
            # 调用解析函数
            return self.parse_directory_structure(response)
        except client.exceptions.ApiException as e:
            print(f"Error executing command: {e}")
            return None
            
    def parse_directory_structure(output: str):
        """
        解析 tree 命令的输出，并返回 JSON 格式的目录结构
        
        :param tree_output: tree 命令的标准输出
        :return: JSON 格式的目录结构
        """
        lines = output.strip().split('\n')
        directory_structure = {}
        current_path = []

        for line in lines[1:]:  # 跳过第一行（根目录）
            # 计算当前层级
            level = line.count('│') + line.count('├') + line.count('└')
            item_name = line.split()[-1]  # 获取最后一个部分作为文件或目录名

            # 根据层级更新当前路径
            if level < len(current_path):
                current_path = current_path[:level]

            # 添加当前项目到路径
            current_path.append(item_name)

            # 构建嵌套结构
            current_dict = directory_structure
            for part in current_path:
                if part not in current_dict:
                    current_dict[part] = {}
                current_dict = current_dict[part]

            # 如果是文件，获取内容并添加
            if not line.startswith('d'):  # 假设以 'd' 开头的是目录
                file_content = self.get_file_content(item_name, current_path)
                current_dict['content'] = file_content
        return json.dumps(directory_structure, indent=4)

    def get_file_content(self, file_name: str, current_path: list):
        """
        获取指定文件的内容
        :param file_name: 文件名
        :param current_path: 当前路径
        :return: 文件内容
        """
        full_path = '/'.join(current_path + [file_name])
        exec_command = ['cat', full_path]
        try:
            response = stream(
                self.core_v1_api.connect_get_namespaced_pod_exec,
                self.pod.metadata.name,
                self.pod.metadata.namespace,
                command=exec_command,
                stderr=True,
                stdin=False,
                stdout=True,
                tty=False
            )
            return response.decode('utf-8')
        except client.exceptions.ApiException as e:
            print(f"Error getting file content: {e}")
            return None