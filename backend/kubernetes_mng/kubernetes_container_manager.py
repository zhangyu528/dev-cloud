# kubernetes_container_manager.py
import logging
from kubernetes import client
from typing import Dict, Optional, List, Union

class KubernetesContainerManager:
    """
    Kubernetes 容器配置管理器
    专注于容器镜像、资源和配置的管理
    """
    def __init__(
        self, 
        namespace: str = "default"
    ):
        """
        初始化容器管理器
        
        :param namespace: Kubernetes 命名空间
        """
        self.namespace = namespace
        self.logger = logging.getLogger(self.__class__.__name__)
    
    def create_container(
        self, 
        name: str, 
        image: str,
        port: int = 8080,
        mount_path: str = "/workspace",
        env_vars: Optional[Dict[str, str]] = None,
    ) -> client.V1Container:
        """
        创建容器配置
        
        :param name: 容器名称
        :param image: 镜像名称
        :param port: 容器端口,default=8080
        :param mount_path: 挂载路径,default="/workspace"
        :return: Kubernetes 容器配置
        """
        try:
            # 获取默认资源配置
            default_resources = self._get_default_resources()
            # 创建环境变量列表
            env_list = self.create_environment_variables(env_vars)
            # 创建容器对象
            container = client.V1Container(
                name=name,
                image=image,
                ports=[
                    client.V1ContainerPort(container_port=port)
                ],
                volume_mounts=[
                    client.V1VolumeMount(
                        name="workspace-data",
                        mount_path=mount_path,
                        read_only=False
                    )
                ],
                resources=default_resources,
                env=env_list
            )

            return container

        except Exception as e:
            error_msg = f"创建容器配置失败: {e}"
            self.logger.error(error_msg)
            raise ValueError(error_msg)

    def _get_default_resources(self) -> client.V1ResourceRequirements:  
        """
        获取默认资源配置
        
        :return: Kubernetes 默认资源需求
        """
        return client.V1ResourceRequirements(
            requests={
            "cpu": "100m",     # 最小 0.1 核 CPU
            "memory": "256Mi"  # 256 兆内存
        },
        limits={
            "cpu": "500m",     # 最大 0.5 核 CPU
            "memory": "512Mi"  # 512 兆内存
        }
    )

    def create_environment_variables(
        self, 
        env_vars: Optional[Dict[str, str]] = None
    ) -> List[client.V1EnvVar]:
        """
        创建环境变量配置
        
        :param env_vars: 自定义环境变量
        :return: Kubernetes 环境变量列表
        """
        if env_vars is None:
            return []

        return [
            client.V1EnvVar(name=key, value=value)
            for key, value in env_vars.items()
        ]