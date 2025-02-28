from kubernetes import client
import json
import logging
import os
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

        self.logger = logging.getLogger(self.__class__.__name__)

    def get_directory_structure(self, directory: str):
        """
        获取指定 Pod 中的目录结构
        
        :param directory: 目录路径
        :return: 目录结构的字典
        """
        self.logger.info(f"获取 {directory} 目录结构")
        
        # 执行 tree 命令，使用 JSON 输出格式
        exec_command = ['tree', '-J', directory] # -J 以 JSON 输出格式显示目录结构
        
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
                        
            try:
                # 方法2：替换单引号为双引号
                import re
                response = re.sub(r"'", '"', response)
                tree_json = json.loads(response)
            except json.JSONDecodeError as json_err:
                self.logger.error(f"JSON解析错误: {json_err}")
                self.logger.error(f"无法解析的响应内容: {response}")
                return {
                    'type': 'directory',
                    'name': os.path.basename(directory),
                    'contents': []
                }

            # 过滤掉报告部分，只保留目录结构
            directory_structure = tree_json[0] if tree_json and isinstance(tree_json, list) else {}

            self.logger.debug(f"Parsed directory_structure: {directory_structure}")

            # 转换为标准格式
            return {
                'type': directory_structure.get('type', 'directory'),
                'name': os.path.basename(directory),
                'contents': directory_structure.get('contents', [])
            }
        except Exception as e:
            error_msg = f"获取 {directory} 目录结构失败: {e}"
            self.logger.error(error_msg, exc_info=True)
            return {
                'type': 'directory',
                'name': os.path.basename(directory),
                'contents': []
            }

    def get_file_content(self, file_path: str):
        """
        获取指定 Pod 中的文件内容
        
        :param file_path: 文件路径
        :return: 文件内容的 JSON 对象
        """
        try:
            # 使用 stream 方法执行命令
            command = ['cat', file_path]
            
            # 使用 exec_stream 方法替代 read_namespaced_pod_exec
            response = stream(
                self.core_v1_api.connect_get_namespaced_pod_exec,
                self.pod.metadata.name,
                self.pod.metadata.namespace,
                command=command,
                stderr=True,
                stdin=False,
                stdout=True,
                tty=False
            )
            # 将文件内容放入 JSON 对象
            return {
                'path': file_path,
                'content': response,
                'size': len(response) if response else 0
            }
        except Exception as e:
            error_msg = f"获取 {file_path} 文件内容失败: {e}"
            self.logger.error(error_msg, exc_info=True)
            return {
                'path': file_path,
                'content': None,
                'error': str(e)
            }