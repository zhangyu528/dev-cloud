# kubernetes_service_manager.py
from kubernetes import client
from typing import Dict, Optional, List
import logging

class KubernetesServiceManager:
    """
    Kubernetes Service 资源管理器
    专注于 Service 的创建、管理和删除
    """
    def __init__(
        self, 
        core_client: client.CoreV1Api,
        namespace: str = "default"
    ):
        """
        初始化 Service 管理器
        
        :param core_client: Kubernetes CoreV1Api 客户端
        :param namespace: Kubernetes 命名空间
        """
        self.core_client = core_client
        self.namespace = namespace
        self.logger = logging.getLogger(self.__class__.__name__)

    def create_service(
        self, 
        name: str, 
        pod_selector: Optional[Dict[str, str]],
        port: int = 8080,
        service_type: str = "ClusterIP"
    ) -> Dict[str, str]:
        """
        为工作空间创建 Kubernetes Service
        
        :param workspace_name: 工作空间名称
        :param pod_selector: Pod 选择器标签
        :param port: 服务端口
        :param service_type: 服务类型
        :return: Service 创建结果
        """

        # Service 元数据
        metadata = client.V1ObjectMeta(
            name=f"{name}-service",
            labels={
                "app": f"{name}-service",
            }
        )

        # Service 规格
        service_spec = client.V1ServiceSpec(
            selector=pod_selector,
            ports=[
                client.V1ServicePort(
                    port=port,
                    target_port=port
                )
            ],
            type=service_type
        )

        # 创建 Service 对象
        service = client.V1Service(
            metadata=metadata,
            spec=service_spec
        )

        try:
            # 创建 Service
            result = self.core_client.create_namespaced_service(
                namespace=self.namespace, 
                body=service
            )

            # 记录日志
            self.logger.info(f"创建 Service: {result.metadata.name}")

            return {
                "name": result.metadata.name,
                "cluster_ip": result.spec.cluster_ip,
                "type": result.spec.type,
                "port": port
            }

        except client.exceptions.ApiException as e:
            # 错误处理
            error_msg = f"创建 Service 失败: {e}"
            self.logger.error(error_msg)
            raise ValueError(error_msg)

    def get_service(self, service_name: str) -> Dict[str, str]:
        """
        获取 Service 详情
        
        :param service_name: Service 名称
        :return: Service 详情
        """
        try:
            service = self.core_client.read_namespaced_service(
                name=service_name, 
                namespace=self.namespace
            )

            return {
                "name": service.metadata.name,
                "cluster_ip": service.spec.cluster_ip,
                "type": service.spec.type,
                "selector": service.spec.selector
            }

        except client.exceptions.ApiException as e:
            error_msg = f"获取 Service 失败: {e}"
            self.logger.error(error_msg)
            raise ValueError(error_msg)

    def list_services(
        self, 
        label_selector: Optional[str] = None
    ) -> List[Dict[str, str]]:
        """
        列出 Services
        
        :param label_selector: 标签选择器
        :return: Services 列表
        """
        try:
            services = self.core_client.list_namespaced_service(
                namespace=self.namespace,
                label_selector=label_selector
            )

            return [
                {
                    "name": svc.metadata.name,
                    "cluster_ip": svc.spec.cluster_ip,
                    "type": svc.spec.type,
                    "labels": svc.metadata.labels
                }
                for svc in services.items
            ]

        except client.exceptions.ApiException as e:
            error_msg = f"列出 Services 失败: {e}"
            self.logger.error(error_msg)
            return []

    def delete_service(self, service_name: str) -> bool:
        """
        删除 Service
        
        :param service_name: Service 名称
        :return: 是否删除成功
        """
        try:
            self.core_client.delete_namespaced_service(
                name=service_name, 
                namespace=self.namespace
            )
            
            self.logger.info(f"删除 Service: {service_name}")
            return True

        except client.exceptions.ApiException as e:
            error_msg = f"删除 Service 失败: {e}"
            self.logger.error(error_msg)
            return False

    def update_service(
        self, 
        service_name: str, 
        port: Optional[int] = None,
        service_type: Optional[str] = None
    ) -> Dict[str, str]:
        """
        更新 Service
        
        :param service_name: Service 名称
        :param port: 新的端口
        :param service_type: 新的服务类型
        :return: 更新后的 Service 信息
        """
        try:
            # 获取当前 Service
            service = self.core_client.read_namespaced_service(
                name=service_name, 
                namespace=self.namespace
            )

            # 更新端口
            if port is not None:
                service.spec.ports[0].port = port
                service.spec.ports[0].target_port = port

            # 更新服务类型
            if service_type is not None:
                service.spec.type = service_type

            # 更新 Service
            updated_service = self.core_client.patch_namespaced_service(
                name=service_name, 
                namespace=self.namespace,
                body=service
            )

            self.logger.info(f"更新 Service: {service_name}")

            return {
                "name": updated_service.metadata.name,
                "cluster_ip": updated_service.spec.cluster_ip,
                "type": updated_service.spec.type,
                "port": updated_service.spec.ports[0].port
            }

        except client.exceptions.ApiException as e:
            error_msg = f"更新 Service 失败: {e}"
            self.logger.error(error_msg)
            raise ValueError(error_msg)