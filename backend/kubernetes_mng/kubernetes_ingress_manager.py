# kubernetes_ingress_manager.py
import logging
from kubernetes import client
from typing import Dict, Optional, List, Union

class KubernetesIngressManager:
    """
    Kubernetes Ingress 资源管理器
    专注于 Ingress 的创建、管理和删除
    """
    def __init__(
        self, 
        networking_client: client.NetworkingV1Api,
        namespace: str = "default"
    ):
        """
        初始化 Ingress 管理器
        
        :param networking_client: Kubernetes NetworkingV1Api 客户端
        :param namespace: Kubernetes 命名空间
        """
        self.networking_client = networking_client
        self.namespace = namespace
        self.logger = logging.getLogger(self.__class__.__name__)

    def create_ingress(
        self, 
        name: str, 
        service_name: str,
        domain: str,
        path: str = "/",
        service_port: int = 8080,
        ingress_class_name: str = "nginx"  # 明确指定 Ingress 类
    ) -> Dict[str, str]:
        """
        为工作空间创建 Ingress
        
        :param workspace_name: 工作空间名称
        :param service_name: 关联的 Service 名称
        :param domain: 域名
        :param path: 路径
        :param service_port: 服务端口
        :param ingress_class_name: Ingress 类名
        :return: Ingress 创建结果
        """

        # Ingress 元数据
        metadata = client.V1ObjectMeta(
            name=f"{name}-ingress",
            labels={
                "app": f"{name}-ingress",
            }
        )

        # Ingress 规格
        ingress_spec = client.V1IngressSpec(
            # 使用 ingressClassName 替代 annotations
            ingress_class_name=ingress_class_name,
            rules=[
                client.V1IngressRule(
                    host=domain,
                    http=client.V1HTTPIngressRuleValue(
                        paths=[
                            client.V1HTTPIngressPath(
                                path=path,
                                path_type="Prefix",
                                backend=client.V1IngressBackend(
                                    service=client.V1IngressServiceBackend(
                                        name=service_name,
                                        port=client.V1ServiceBackendPort(
                                            number=service_port
                                        )
                                    )
                                )
                            )
                        ]
                    )
                )
            ]
        )

        # 创建 Ingress 对象
        ingress = client.V1Ingress(
            metadata=metadata,
            spec=ingress_spec
        )

        try:
            # 创建 Ingress
            result = self.networking_client.create_namespaced_ingress(
                namespace=self.namespace, 
                body=ingress
            )

            # 记录日志
            self.logger.info(f"创建 Ingress: {result.metadata.name}")

            return {
                "name": result.metadata.name,
                "host": domain,
                "path": path,
                "service": service_name,
                "ingress_class": ingress_class_name
            }

        except client.exceptions.ApiException as e:
            # 错误处理
            error_msg = f"创建 Ingress 失败: {e}"
            self.logger.error(error_msg)
            raise ValueError(error_msg)

    def get_ingress(self, ingress_name: str) -> Dict[str, Union[str, List]]:
        """
        获取 Ingress 详情
        
        :param ingress_name: Ingress 名称
        :return: Ingress 详情
        """
        try:
            ingress = self.networking_client.read_namespaced_ingress(
                name=ingress_name, 
                namespace=self.namespace
            )

            return {
                "name": ingress.metadata.name,
                "host": ingress.spec.rules[0].host if ingress.spec.rules else None,
                "paths": [
                    {
                        "path": rule.path,
                        "service": rule.backend.service.name
                    }
                    for rule in ingress.spec.rules[0].http.paths
                ] if ingress.spec.rules and ingress.spec.rules[0].http else []
            }

        except client.exceptions.ApiException as e:
            error_msg = f"获取 Ingress 失败: {e}"
            self.logger.error(error_msg)
            raise ValueError(error_msg)

    def list_ingresses(
        self, 
        label_selector: Optional[str] = None
    ) -> List[Dict[str, str]]:
        """
        列出 Ingresses
        
        :param label_selector: 标签选择器
        :return: Ingresses 列表
        """
        try:
            ingresses = self.networking_client.list_namespaced_ingress(
                namespace=self.namespace,
                label_selector=label_selector
            )

            return [
                {
                    "name": ing.metadata.name,
                    "host": ing.spec.rules[0].host if ing.spec.rules else None,
                    "labels": ing.metadata.labels
                }
                for ing in ingresses.items
            ]

        except client.exceptions.ApiException as e:
            error_msg = f"列出 Ingresses 失败: {e}"
            self.logger.error(error_msg)
            return []

    def delete_ingress(self, ingress_name: str) -> bool:
        """
        删除 Ingress
        
        :param ingress_name: Ingress 名称
        :return: 是否删除成功
        """
        try:
            self.networking_client.delete_namespaced_ingress(
                name=ingress_name, 
                namespace=self.namespace
            )
            
            self.logger.info(f"删除 Ingress: {ingress_name}")
            return True

        except client.exceptions.ApiException as e:
            error_msg = f"删除 Ingress 失败: {e}"
            self.logger.error(error_msg)
            return False

    def update_ingress(
        self, 
        ingress_name: str, 
        service_name: Optional[str] = None,
        domain: Optional[str] = None,
        path: Optional[str] = None
    ) -> Dict[str, str]:
        """
        更新 Ingress
        
        :param ingress_name: Ingress 名称
        :param service_name: 新的 Service 名称
        :param domain: 新的域名
        :param path: 新的路径
        :return: 更新后的 Ingress 信息
        """
        try:
            # 获取当前 Ingress
            ingress = self.networking_client.read_namespaced_ingress(
                name=ingress_name, 
                namespace=self.namespace
            )

            # 更新服务名称
            if service_name and ingress.spec.rules:
                ingress.spec.rules[0].http.paths[0].backend.service.name = service_name

            # 更新域名
            if domain and ingress.spec.rules:
                ingress.spec.rules[0].host = domain

            # 更新路径
            if path and ingress.spec.rules:
                ingress.spec.rules[0].http.paths[0].path = path

            # 更新 Ingress
            updated_ingress = self.networking_client.patch_namespaced_ingress(
                name=ingress_name, 
                namespace=self.namespace,
                body=ingress
            )

            self.logger.info(f"更新 Ingress: {ingress_name}")

            return {
                "name": updated_ingress.metadata.name,
                "host": updated_ingress.spec.rules[0].host if updated_ingress.spec.rules else None,
                "service": updated_ingress.spec.rules[0].http.paths[0].backend.service.name if updated_ingress.spec.rules else None
            }

        except client.exceptions.ApiException as e:
            error_msg = f"更新 Ingress 失败: {e}"
            self.logger.error(error_msg)
            raise ValueError(error_msg)