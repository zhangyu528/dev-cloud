from kubernetes import client, config

class KubernetesPodManager:
    def __init__(self, kube_config_path=None, template_name="", project_name=""):
        """
        初始化 KubernetesPodManager。
        可以选择传入 kube_config_path 来加载指定的 kubeconfig 文件，并设置命名空间。
        
        :param kube_config_path: kubeconfig 文件的路径，默认为 None（加载默认配置）
        :param namespace: Kubernetes 命名空间，默认为 "default"
        """
        # 加载 kubeconfig，默认加载 ~/.kube/config
        if kube_config_path:
            config.load_kube_config(config_file=kube_config_path)
        else:
            config.load_kube_config()
        
        self.api_instance = client.CoreV1Api()
        self.net_instance = client.NetworkingV1Api()

        
        self.namespace = "flask-dev-cloud-server"  # 将命名空间存储为成员变量
        self.template_name = template_name  # 将 template_name 存储为成员变量
        self.project_name = project_name  # 将 project_name 存储为成员变量

        self.pv_name = f"{self.project_name}-shared-pv"
        self.pvc_name = f"{self.project_name}-shared-pvc"

        self.service_name = f"{self.project_name}-service"
        self.ingress_name = f"{self.project_name}-ingress"
        self.pod_name =f"{self.project_name}-app-pod"

        # 定义命名空间对象
        namespace_body = client.V1Namespace(
            metadata=client.V1ObjectMeta(name=self.namespace)
        )

        try:
            # 创建 Namespace
            self.api_instance.create_namespace(body=namespace_body)
            print(f"Namespace '{self.namespace}' 创建成功！")
        except Exception as e:
            if e.status == 409:
                print(f"Namespace '{self.namespace}' 已存在，无需创建。")
            else:
                print(f"创建 Namespace 失败: {e}")


    def create_shared_pv_config(self):
        """
        创建共享 PersistentVolume 配置。

        :return: 返回 PersistentVolume 配置对象
        """
        pv = client.V1PersistentVolume(
            api_version="v1",
            kind="PersistentVolume",
            metadata=client.V1ObjectMeta(name=self.pv_name, namespace=self.namespace),
            spec=client.V1PersistentVolumeSpec(
                capacity={"storage": "10Gi"},
                access_modes=["ReadWriteMany"],
                persistent_volume_reclaim_policy="Delete",
                storage_class_name="hostpath",  # 存储类名为 hostpath
                host_path=client.V1HostPathVolumeSource(path="/home")  # 物理存储路径
            )
        )
        return pv

    def create_shared_pvc_config(self):
        """
        创建共享 PersistentVolumeClaim 配置。

        :return: 返回 PersistentVolumeClaim 配置对象
        """
        pvc = client.V1PersistentVolumeClaim(
            api_version="v1",
            kind="PersistentVolumeClaim",
            metadata=client.V1ObjectMeta(name=self.pvc_name, namespace=self.namespace),
            spec=client.V1PersistentVolumeClaimSpec(
                access_modes=["ReadWriteMany"],
                resources=client.V1ResourceRequirements(requests={"storage": "10Gi"}),
                storage_class_name="hostpath", # 存储类名为 hostpath
                volume_name=self.pv_name  # 必须和 PV 名称一致
            )
        )
        return pvc

    def create_pv(self, pv):
        """
        创建 PersistentVolume。

        :param pv: PersistentVolume 配置对象
        :return: API 调用结果
        """
        api_response = self.api_instance.create_persistent_volume(body=pv, namespace=self.namespace) # 使用类中存储的命名空间
        print(f"PersistentVolume created. Status: {api_response.status.phase}")
    def delete_pv(self):
        try: 
            # 删除与 PVC 相关的 PersistentVolume (PV)（如果 PVC 已删除并且 ReclaimPolicy 是 Delete）
            self.api_instance.delete_persistent_volume(self.pv_name, namespace=self.namespace)
            print(f"PersistentVolume '{self.pv_name}' 已成功删除")
        except Exception as e:
            print(f"PersistentVolume '{self.pv_name}' 删除失败: {e}")
    def create_pvc(self, pvc):
        """
        创建 PersistentVolumeClaim。

        :param pvc: PersistentVolumeClaim 配置对象
        :return: API 调用结果
        """
        api_response = self.api_instance.create_namespaced_persistent_volume_claim(
            body=pvc,
            namespace=self.namespace  # 使用类中存储的命名空间
        )
        print(f"PersistentVolumeClaim created. Status: {api_response.status.phase}")

    def delete_pvc(self):
        # 删除与 Pod 相关的 PVC（如果有的话）
        try:
            self.api_instance.delete_namespaced_persistent_volume_claim(self.pvc_name, self.namespace)
            print(f"PersistentVolumeClaim '{self.pvc_name}' 已成功删除")
        except Exception as e:
            print(f"PVC '{self.pvc_name}' 删除失败: {e}")

    def create_storage_resources(self):
        """
        创建 PV 和 PVC 资源。
        """
        pv = self.create_shared_pv_config()
        pvc = self.create_shared_pvc_config()
        self.create_pv(pv)
        self.create_pvc(pvc)
    
    def create_service(self):
        """
        创建 Service 配置，用于暴露 Pod 服务。
        
        :param project_name: 项目名称，将用于 Service 名称
        :param container_port: 容器内应用监听的端口
        :return: 创建的 Service 对象
        """
        service = client.V1Service(
            api_version="v1",
            kind="Service",
            metadata=client.V1ObjectMeta(name=self.service_name, namespace=self.namespace),
            spec=client.V1ServiceSpec(
                selector={
                    "app": self.pod_name  # 匹配拥有这个标签的 Pod
                },
                ports=[client.V1ServicePort(
                    name=f"code-server-port",
                    port=8080,  # 外部暴露的端口
                    target_port=8080, # 容器内部的端口
                )],
                type="ClusterIP",  # 是 Kubernetes 默认的服务类型
            )
        )
        return service
    def create_service_instance(self):
        """
        创建并应用 Service 配置。
        
        :param project_name: 项目名称
        :param container_port: 容器端口
        """
        service = self.create_service()
        # 调用 Kubernetes API 创建 Service
        api_response = self.api_instance.create_namespaced_service(
            body=service,
            namespace=self.namespace
        )
        print(f"Service created. Status: {api_response}")
    def delete_service_instance(self):
        # 删除与 Pod 相关的 Service（如果有的话）
        # Service 名称假设与 Pod 名称相同
        try:
            self.api_instance.delete_namespaced_service(self.service_name, self.namespace)
            print(f"Service '{self.service_name}' 已成功删除")
        except Exception as e:
            print(f"Service '{self.service_name}' 删除失败: {e}")

    def create_ingress_instance(self):
        """
        创建并应用 Ingress 配置。
        
        :param project_name: 项目名称
        """

        # 定义 Ingress 的注解
        annotations = {
            #"nginx.ingress.kubernetes.io/rewrite-target": "/",  # 适用于匹配到的路径，去除前缀
        }
        # 假设 Kubernetes 集群中有 code-server-service，并在 8080 端口上暴��
        # 假设 Ingress 所使用的 DNS 域为 example.com
        # 构造 Ingress 配置
        ingress = client.V1Ingress(
            api_version="networking.k8s.io/v1",
            kind="Ingress",
            metadata=client.V1ObjectMeta(name=self.ingress_name, namespace=self.namespace, annotations=annotations),
            spec=client.V1IngressSpec(
                ingress_class_name="nginx",  # 指定使用 NGINX Ingress Controller
                rules=[
                    client.V1IngressRule(
                        #host="localhost",
                        host=f"{self.project_name}.127.0.0.1.nip.io",  # 你可以自定义主机
                        http=client.V1HTTPIngressRuleValue(# http 路由规则
                            paths=[
                                client.V1HTTPIngressPath(
                                    path="/",
                                    #path=f"/{self.project_name}",  # 动态路径
                                    path_type="Prefix",  # 路径类型
                                    backend=client.V1IngressBackend(
                                        service=client.V1IngressServiceBackend(
                                            name=f"{self.service_name}", # 服务名称
                                            port=client.V1ServiceBackendPort(
                                                number=8080  # 假设 Service 暴露 8080 端口
                                            )
                                        )
                                    )
                                )
                            ]
                        )
                    )
                ]
            )
        )

        try:
            # 调用 Kubernetes API 创建 Ingress
            api_response = self.net_instance.create_namespaced_ingress(
                body=ingress,
                namespace=self.namespace
            )
            print(f"Ingress created. Status: {api_response}")
        except Exception as e:
            print(f"Exception when creating Ingress: {e}")
    
    def delete_ingress_instance(self):
        """
        删除 Ingress。
        """
        try:
            self.net_instance.delete_namespaced_ingress(self.ingress_name, self.namespace)
            print(f"Ingress '{self.ingress_name}' 已成功删除")
        except Exception as e:
            print(f"Exception when deleting Ingress: {e}")











    def create_pod(self):
        """
        创建 Pod 配置，并返回创建的 Pod 对象。

        :param template_name: 模板名称，将作为容器名称和共享卷名称的一部分
        :param project_name: 项目名称，将用于 Pod 名称
        :return: 创建的 Pod 对象
        """

        pod = client.V1Pod(
            api_version="v1",
            kind="Pod",
            metadata=client.V1ObjectMeta(name=self.pod_name,
                                        namespace=self.namespace,
                                        labels={"app": self.pod_name}),
            spec=client.V1PodSpec(
                containers=[
                    client.V1Container(
                        name="code-server",
                        image="localhost:9000/code-server:latest",
                        ports=[client.V1ContainerPort(container_port=8080)],
                        volume_mounts=[client.V1VolumeMount(mount_path=f"/home/coder/code-server", name=f"{self.project_name}-volume")],

                        # Additional arguments can be added here]
                    ),
                    client.V1Container(
                        name=self.template_name.lower(),
                        image=f"localhost:9000/{self.template_name.lower()}:latest",
                        ports=[client.V1ContainerPort(container_port=4200)],
                        env=[client.V1EnvVar(name="PROJECT_NAME", value=self.project_name)],
                        volume_mounts=[client.V1VolumeMount(mount_path=f"/home/user", name=f"{self.project_name}-volume")]
                    )
                ],
                volumes=[
                    client.V1Volume(
                        name=f"{self.project_name}-volume",
                        empty_dir=client.V1EmptyDirVolumeSource()     
                    )
                ]
            )
        )
        return pod

    def create_pod_instance(self):
        """
        创建 Pod 并应用到 Kubernetes 集群中。

        :param template_name: 模板名称
        :param project_name: 项目名称
        """
        # self.create_storage_resources()
        self.create_service_instance()
        self.create_ingress_instance()

        pod = self.create_pod()
        # 调用 Kubernetes API 创建 Pod
        api_response = self.api_instance.create_namespaced_pod(
            body=pod,
            namespace=self.namespace  # 使用类中存储的命名空间
        )
        print(f"Pod created. Status: {api_response.status.phase}")

    def delete_pod_instance(self):
        """
        删除 Pod 实例。
        """
        self.delete_service_instance()
        self.delete_ingress_instance()
        try:
            # 删除 Pod
            self.api_instance.delete_namespaced_pod(self.pod_name, self.namespace)
            print(f"Pod '{self.pod_name}' 已成功删除")
        except Exception as e:
            print(f"删除 Pod '{self.pod_name}' 失败: {e}")
            