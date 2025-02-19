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
                name=f"{normalized_template}-container",
                image=f"localhost:9000/{normalized_template}:latest",
                port=4200,
                mount_path="/home/user",
                env_vars={
                    "PROJECT_NAME": workspace_name,
                }
            )
            
            # 创建 VScodeserver 容器
            codeserver_container = self.container_manager.create_container(
                name="code-server-container",
                image="localhost:9000/code-server:latest",
                port=8080,
                mount_path="/home/coder/code-server",
            )

            # 准备容器列表
            containers = [template_container, codeserver_container]

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
            self.ingress_manager.delete_ingress(f"{workspace_name.lower()}-ingress")
            
            # 删除服务
            self.service_manager.delete_service(f"{workspace_name.lower()}-service")
            
            # 删除 Pod
            self.pod_manager.delete_pod(f"{workspace_name.lower()}-pod")

            self.logger.info(f"成功删除工作空间: {workspace_name}")
            return True

        except Exception as e:
            error_msg = f"删除工作空间失败: {e}"
            self.logger.error(error_msg)
            return False

    def list_workspaces(self) -> List[Dict[str, Union[str, Dict]]]:
        """
        列出所有工作空间
        
        :return: 工作空间列表
        """
        try:
            # 获取所有相关资源
            pods = self.pod_manager.list_pods()
            services = self.service_manager.list_services()
            ingresses = self.ingress_manager.list_ingresses()

            # 组合工作空间信息
            workspaces = []
            for pod in pods:
                workspace = {
                    "name": pod['name'].replace('-pod', '').lower(),
                    "pod_status": pod['status']
                }
                
                # 匹配服务
                matching_service = next(
                    (svc for svc in services if svc['name'] == f"{workspace['name']}-service"), 
                    None
                )
                if matching_service:
                    workspace['service'] = matching_service

                # 匹配 Ingress
                matching_ingress = next(
                    (ing for ing in ingresses if ing['name'] == f"{workspace['name']}-ingress"), 
                    None
                )
                if matching_ingress:
                    workspace['ingress'] = matching_ingress

                workspaces.append(workspace)

            return workspaces

        except Exception as e:
            error_msg = f"列出工作空间失败: {e}"
            self.logger.error(error_msg)
            return []

    def get_workspace_details(self, workspace_name: str) -> Optional[Dict[str, Union[str, Dict]]]:
        """
        获取特定工作空间的详细信息
        
        :param workspace_name: 工作空间名称
        :return: 工作空间详细信息
        """
        try:
            # 获取 Pod 详情
            pod = self.pod_manager.get_pod(f"{workspace_name.lower()}-pod")
            
            # 获取服务详情
            service = self.service_manager.get_service(f"{workspace_name.lower()}-service")
            
            # 获取 Ingress 详情
            ingress = self.ingress_manager.get_ingress(f"{workspace_name.lower()}-ingress")

            return {
                "workspace_name": workspace_name,
                "pod": pod,
                "service": service,
                "ingress": ingress
            }

        except Exception as e:
            error_msg = f"获取工作空间详情失败: {e}"
            self.logger.error(error_msg)
            return None