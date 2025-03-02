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
            # 记录执行命令的详细信息
            self.logger.debug(f"执行命令: {' '.join(exec_command)}")
            self.logger.debug(f"Pod 名称: {self.pod.metadata.name}")
            self.logger.debug(f"Pod 命名空间: {self.pod.metadata.namespace}")
            
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
            
            # 记录原始响应
            self.logger.debug(f"原始响应长度: {len(response)}")
            self.logger.debug(f"原始响应前100个字符: {repr(response[:100])}")
            
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
            
            # 记录解析后的目录结构
            #self.logger.debug(f"解析后的目录结构: {json.dumps(directory_structure, indent=2)}")

            # 转换为标准格式
            return {
                'type': directory_structure.get('type', 'directory'),
                'name': os.path.basename(directory),
                'contents': directory_structure.get('contents', [])
            }
        except Exception as e:
            error_msg = f"获取 {directory} 目录结构失败: {e}"
            self.logger.error(error_msg, exc_info=True)
            
            # 记录更多错误详情
            self.logger.error(f"异常类型: {type(e).__name__}")
            self.logger.error(f"异常详细信息: {str(e)}")
            
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
            # 记录详细的调试信息
            self.logger.debug(f"尝试获取文件内容: {file_path}")
            self.logger.debug(f"Pod 名称: {self.pod.metadata.name}")
            self.logger.debug(f"Pod 命名空间: {self.pod.metadata.namespace}")
            
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
            
            # 检查是否为 JSON 文件
            if file_path.lower().endswith('.json'):
                try:
                    import ast
                    import json
                    
                    # 直接使用 ast.literal_eval 解析 Python 字典
                    parsed_json = ast.literal_eval(response)
                    
                    # 使用 json.dumps 格式化，保留 Python 布尔值和 None 的正确表示
                    response = json.dumps(parsed_json, indent=2, ensure_ascii=False)
                except Exception as json_error:
                    # 如果解析失败，记录错误但保留原始内容
                    self.logger.error(f"JSON 格式化失败: {json_error}")
                    self.logger.error(f"原始内容: {repr(response)}")
            
            # 直接返回内容
            self.logger.debug(f"原始内容长度: {len(response)}")
            self.logger.debug(f"原始内容前100个字符: {repr(response[:100])}")
            
            # 将文件内容放入 JSON 对象
            return {
                'path': file_path,
                'content': response,
                'size': len(response) if response else 0
            }
        except Exception as e:
            error_msg = f"获取 {file_path} 文件内容失败: {e}"
            self.logger.error(error_msg, exc_info=True)
            
            # 记录更多错误详情
            self.logger.error(f"异常类型: {type(e).__name__}")
            self.logger.error(f"异常详细信息: {str(e)}")
            
            return {
                'path': file_path,
                'content': None,
                'error': str(e)
            }