# workspace_manager.py
import logging
from typing import Dict, Optional, List, Union
from kubernetes import client, config
from sqlalchemy import true

from kubernetes_mng.kubernetes_pod_resource_manager import KubernetesPodResourceManager
from kubernetes_mng.kubernetes_container_manager import KubernetesContainerManager
from kubernetes_mng.kubernetes_service_manager import KubernetesServiceManager
from kubernetes_mng.kubernetes_ingress_manager import KubernetesIngressManager

class WorkspaceManager:
    def __init__(
        self, 
        namespace: str = "default"
    ): 
        """
        初始化工作空间管理器
        
        :param namespace: Kubernetes 命名空间
        """
        self.namespace = namespace
        self.logger = logging.getLogger(self.__class__.__name__)

        config.load_kube_config()

        # 自动创建 Kubernetes 客户端
        core_client = client.CoreV1Api()
        networking_client = client.NetworkingV1Api()
        # 定义命名空间对象
        namespace_body = client.V1Namespace(
            metadata=client.V1ObjectMeta(name=self.namespace)
        )
        try:
            # 创建 Namespace
            core_client.create_namespace(body=namespace_body)
            self.logger.info(f"Namespace '{self.namespace}' 创建成功！")
        except Exception as e:
            if e.status == 409:
                self.logger.info(f"Namespace '{self.namespace}' 已存在，无需创建。")
            else:
                self.logger.error(f"创建 Namespace 失败: {e}")
        
        # 初始化资源管理器
        self.pod_manager = KubernetesPodResourceManager(
            core_client=core_client, 
            namespace=namespace
        )
        
        self.container_manager = KubernetesContainerManager(
            namespace=namespace
        )
        
        self.service_manager = KubernetesServiceManager(
            core_client=core_client, 
            namespace=namespace
        )
        
        self.ingress_manager = KubernetesIngressManager(
            networking_client=networking_client, 
            namespace=namespace
        )

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
            template_container = self.container_manager.create_container(
                name=f"{workspace_name}",
                image=f"localhost:9000/{normalized_template}:latest",
                ports=[4200, 8080],
                mount_path="/home/user",
                env_vars={
                    "PROJECT_NAME": workspace_name,
                }
            )

            # 准备容器列表
            containers = [template_container]

            # 创建 Pod
            pod = self.pod_manager.create_pod(
                name=f"{workspace_name.lower()}",
                containers=containers
            )

            # 创建服务
            service = self.service_manager.create_service(
                name=f"{workspace_name.lower()}",
                pod_selector={
                    "app": f"{workspace_name.lower()}-app"
                },
                port=8080  # 使用 code-server 的固定端口
            )

            # 创建 Ingress（可选）
            ingress = self.ingress_manager.create_ingress(
                name=f"{workspace_name.lower()}",
                service_name=f"{workspace_name.lower()}-service",
                domain=f"{workspace_name.lower()}.127.0.0.1.nip.io",
                service_port=8080  # 使用 code-server 的固定端口
            )

            # 记录日志
            self.logger.info(f"成功创建工作空间: {workspace_name}")
            
        except Exception as e:
            error_msg = f"创建工作空间失败: {e}"
            self.logger.error(error_msg)
            raise ValueError(error_msg)

    def delete_workspace(self, workspace_name: str) -> bool:
        """
        删除整个工作空间
        
        :param workspace_name: 工作空间名称
        :return: 是否删除成功
        """
        try:
            # 删除 Ingress
            self.ingress_manager.delete_ingress(workspace_name)
            
            # 删除服务
            self.service_manager.delete_service(workspace_name)
            
            # 删除 Pod
            self.pod_manager.delete_pod(workspace_name)

            self.logger.info(f"成功删除工作空间: {workspace_name}")
            return True

        except Exception as e:
            error_msg = f"删除工作空间失败: {e}"
            self.logger.error(error_msg)
            return False
