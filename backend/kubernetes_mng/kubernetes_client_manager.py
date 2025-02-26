from kubernetes import client, config

class KubernetesClientManager:
    _instance = None

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def __init__(self):
        config.load_kube_config()  # 加载 Kubernetes 配置
        self.core_v1_api = client.CoreV1Api()  # 创建 CoreV1Api 实例
        self.networking_v1_api = client.NetworkingV1Api()  # 创建 NetworkingV1Api 实例

        self.namespace = "dev-cloud"

        # 定义命名空间对象
        namespace_body = client.V1Namespace(
            metadata=client.V1ObjectMeta(name=self.namespace)
        )
        # 创建 Namespace
        self.core_v1_api.create_namespace(body=namespace_body)

    def get_core_v1_api(self):
        return self.core_v1_api

    def get_networking_v1_api(self):
        return self.networking_v1_api

    def get_namespace(self) -> str:
        """获取当前命名空间"""
        return self.namespace