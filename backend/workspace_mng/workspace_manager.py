# workspace_manager.py
import logging

from kubernetes_mng.kubernetes_pod_resource_manager import KubernetesPodResourceManager
from kubernetes_mng.kubernetes_container_manager import KubernetesContainerManager
from kubernetes_mng.kubernetes_service_manager import KubernetesServiceManager
from kubernetes_mng.kubernetes_ingress_manager import KubernetesIngressManager
from kubernetes_mng.kubernetes_client_manager import KubernetesClientManager


class WorkspaceManager:
    _instances = {}

    @classmethod
    def get_instance(cls, namespace: str = "default"):
        if namespace not in cls._instances:
            cls._instances[namespace] = cls(namespace)
        return cls._instances[namespace]

    def __init__(self):
        if not hasattr(self, 'initialized'):
            """
            初始化工作空间管理器
            """
            self.logger = logging.getLogger(self.__class__.__name__)

            # 初始化资源管理器
            self.pod_manager = KubernetesPodResourceManager()
            self.container_manager = KubernetesContainerManager()
            # self.service_manager = KubernetesServiceManager()
            # self.ingress_manager = KubernetesIngressManager()
            self.initialized = True

    def create_workspace(
        self, 
        workspace_name: str, 
        template_name: str
    ):
        """
        创建完整的工作空间
        
        :param workspace_name: 工作空间名称
        :param template_name: 模板名称
        :return: 工作空间资源信息
        """
        try:
            # 标准化模板名称为小写
            normalized_template = template_name.lower()
            
            # 创建模板容器
            self.template_container = self.container_manager.create_container(
                name=f"{workspace_name}",
                image=f"{normalized_template}:latest",
                ports=[4200],
                mount_path=f"/home/developer/{workspace_name.lower()}",
                env_vars={
                    "PROJECT_NAME": workspace_name,
                },
                image_pull_policy="IfNotPresent"
            )

            # 准备容器列表
            containers = [template_container]

            # 创建 Pod
            self.pod = self.pod_manager.create_pod(
                name=f"{workspace_name.lower()}",
                containers=containers
            )

            # 创建服务
            # service = self.service_manager.create_service(
            #     name=f"{workspace_name.lower()}",
            #     pod_selector={
            #         "app": f"{workspace_name.lower()}-app"
            #     },
            #     port=8080  # 使用 code-server 的固定端口
            # )

            # 创建 Ingress（可选）
            # ingress = self.ingress_manager.create_ingress(
            #     name=f"{workspace_name.lower()}",
            #     service_name=f"{workspace_name.lower()}-service",
            #     domain=f"{workspace_name.lower()}.127.0.0.1.nip.io",
            #     service_port=8080  # 使用 code-server 的固定端口
            # )

            # 记录日志
            self.logger.info(f"成功创建工作空间: {workspace_name}")
            
        except Exception as e:
            self.delete_workspace(workspace_name)
            error_msg = f"创建工作空间失败: {e}"
            self.logger.error(error_msg)
            raise ValueError(error_msg)

    def delete_workspace(self, workspace_name: str):
        """
        删除整个工作空间
        
        :param workspace_name: 工作空间名称
        :return: 是否删除成功
        """
        try:
            # 删除 Ingress
            # self.ingress_manager.delete_ingress(workspace_name)
            
            # 删除服务
            # self.service_manager.delete_service(workspace_name)
            
            # 删除 Pod
            self.pod_manager.delete_pod(workspace_name)

            self.logger.info(f"成功删除工作空间: {workspace_name}")

        except Exception as e:
            error_msg = f"删除工作空间失败: {e}"
            self.logger.error(error_msg)
            raise ValueError(error_msg)


    def get_workspace_directory_structure(self, workspace_name: str):
        return self.pod_manager.get_pod_directory_structure(workspace_name)