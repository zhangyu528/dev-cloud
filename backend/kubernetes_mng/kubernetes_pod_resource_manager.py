# kubernetes_pod_resource_manager.py
import logging
from typing import Dict, Optional, List, Union
from kubernetes import client

from backend.kubernetes_mng.kubernetes_client_manager import KubernetesClientManager
from backend.kubernetes_mng.kubernetes_pod import KubernetesPod

class KubernetesPodResourceManager:
    """
    Kubernetes Pod 资源管理器
    专注于 Pod 的创建、管理和删除
    """

    def __init__(self):
        """
        初始化 Pod 管理器
        """
        self.namespace = KubernetesClientManager.get_instance().get_namespace()
        self.logger = logging.getLogger(self.__class__.__name__)

        self.core_v1_api = KubernetesClientManager.get_instance().get_core_v1_api()

    def create_pod(
        self, 
        name: str, 
        containers: Optional[List[client.V1Container]] = None,
    ):
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
            result = self.core_v1_api.create_namespaced_pod(
                body=pod, 
                namespace=self.namespace
            )

            self.logger.info(f"创建 Pod: {result.metadata.name}")

        except client.exceptions.ApiException as e:
            error_msg = f"创建 Pod 失败: {e}"
            self.logger.error(error_msg)
            raise ValueError(error_msg)
            
    def delete_pod(self, name: str):
        """
        删除 Pod
        
        :param name: Pod 名称
        :return: 是否删除成功
        """
        try:
            self.core_client.delete_namespaced_pod(
                name=f"{name.lower()}-pod", 
                namespace=self.namespace
            )
            
            self.logger.info(f"删除 Pod: {name}")
            return True

        except client.exceptions.ApiException as e:
            error_msg = f"删除 Pod 失败: {e}"
            self.logger.error(error_msg)
            raise ValueError(error_msg)

    def get_pod_directory_structure(self, pod_name: str, directory: str = "/home/developer"):
        """
        根据 Pod 名称获取目录结构
        
        :param pod_name: Pod 的名称
        :param directory: 目录路径
        :return: 目录结构的列表
        """
        # 获取 Pod 对象
        pod = self.core_v1_api.read_namespaced_pod(name=pod_name, namespace=self.namespace)
        
        # 实例化 KubernetesPod
        k8s_pod = KubernetesPod(pod=pod)
        
        # 获取目录结构
        directory_structure = k8s_pod.get_directory_structure(directory)
        return directory_structure