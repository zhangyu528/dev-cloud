# kubernetes_pod_resource_manager.py
import logging
from mimetypes import init
from typing import Dict, Optional, List, Union
from kubernetes import client

class KubernetesPodResourceManager:
    """
    Kubernetes Pod 资源管理器
    专注于 Pod 的创建、管理和删除
    """

    def __init__(
        self, 
        core_client: client.CoreV1Api,
        namespace: str = "default"
    ):
        """
        初始化 Pod 管理器
        
        :param core_client: Kubernetes CoreV1Api 客户端
        :param namespace: Kubernetes 命名空间
        """
        self.core_client = core_client
        self.namespace = namespace
        self.logger = logging.getLogger(self.__class__.__name__)
    

    def create_pod(
        self, 
        name: str, 
        containers: Optional[List[client.V1Container]] = None,
    ) -> client.V1Pod:
        """
        创建工作空间 Pod
        
        :param name: 工作空间名称
        :param containers: 可变数量的容器对象
        :return: Pod 创建结果
        """
        # 如果没有传入容器，返回 None
        if not containers:
            return None

        try:
            # Pod 元数据
            metadata = client.V1ObjectMeta(
                name=f"{name}-pod",
                labels={
                    "app": f"{name}-app",
                }
            )
            # 创建卷
            volume = client.V1Volume(
                name="workspace-data",
                empty_dir=client.V1EmptyDirVolumeSource()
            )
            # Pod 规格
            pod_spec = client.V1PodSpec(
                containers=containers,
                volumes=[volume],
            )

            # 创建 Pod 对象
            pod = client.V1Pod(
                metadata=metadata, 
                spec=pod_spec
            )

            # 创建 Pod
            result = self.core_client.create_namespaced_pod(
                body=pod, 
                namespace=self.namespace
            )

            self.logger.info(f"创建 Pod: {result.metadata.name}")

            return result

        except client.exceptions.ApiException as e:
            error_msg = f"创建 Pod 失败: {e}"
            self.logger.error(error_msg)
            raise ValueError(error_msg)
            
    def delete_pod(self, name: str) -> bool:
        """
        删除 Pod
        
        :param name: Pod 名称
        :return: 是否删除成功
        """
        try:
            self.core_client.delete_namespaced_pod(
                name=name, 
                namespace=self.namespace
            )
            
            self.logger.info(f"删除 Pod: {name}")
            return True

        except client.exceptions.ApiException as e:
            error_msg = f"删除 Pod 失败: {e}"
            self.logger.error(error_msg)
            return False