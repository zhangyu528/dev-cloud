# backend/kubernetes_pod/pod_tracker.py
import threading
from flask import Flask
from flask_sse import sse
from kubernetes import client, watch, config
from typing import Callable, Optional

class PodTracker:
    def __init__(
        self, 
        app: Flask,  # 添加 Flask 应用实例参数
        namespace: str, 
        workspace_name: str, 
        k8s_client: Optional[client.CoreV1Api] = None
    ):
        """
        Kubernetes Pod 状态追踪器
        
        :param namespace: Kubernetes 命名空间
        :param workspace_name: 工作空间名称
        :param k8s_client: Kubernetes API 客户端
        """
        self.app = app
        self.namespace = namespace
        self.workspace_name = workspace_name
        # 尝试多种方式加载 Kubernetes 配置
        try:
            # 首选：尝试从集群内部加载配置
            config.load_incluster_config()
        except config.ConfigException:
            try:
                # 备选：尝试从 kubeconfig 文件加载
                config.load_kube_config()
            except Exception as e:
                print(f"无法加载 Kubernetes 配置: {e}")
                raise

        # 创建 API 客户端
        self.k8s_client = client.CoreV1Api()
        self._stop_event = threading.Event()

        # 提前保存应用上下文
        self._app_context = self.app.app_context()

    def _track_pod_status(self):
        """
        持续追踪 Pod 状态
        使用 Kubernetes Watch API 实时监听 Pod 变化
        """
        try:
            # 标签选择器，根据工作空间名称过滤 Pod
            label_selector = f"app={self.workspace_name}-app-pod"
            
            # 创建 Kubernetes 资源监听器
            watcher = watch.Watch()

            print("Listing pods in namespace: ", self.namespace)
            
            for event in watcher.stream(
                self.k8s_client.list_namespaced_pod, 
                namespace=self.namespace, 
                label_selector=label_selector
            ):
                if self._stop_event.is_set():
                    break

                pod = event['object']
                status = self._extract_pod_status(pod)
                
                # 在应用上下文中发布状态
                self._publish_status_in_context(status)

                # 如果 Pod 处于终止状态，停止追踪
                if status in ['Succeeded', 'Failed']:
                    break

        except Exception as e:
            print("Pod tracking error")
            print(e)
            # self.app.logger.error(f"Pod tracking error: {e}")
            # self._publish_status('Error')

    def _extract_pod_status(self, pod) -> str:
        """
        从 Pod 对象提取状态
        
        :param pod: Kubernetes Pod 对象
        :return: 状态字符串
        """
        phase = pod.status.phase
        conditions = pod.status.conditions or []
        
        status_mapping = {
            'Pending': 'initializing',
            'Running': 'running',
            'Succeeded': 'completed',
            'Failed': 'error'
        }
        
        return status_mapping.get(phase, 'unknown')

    def _publish_status_in_context(self, status: str):
        """
        在应用上下文中发布状态
        
        :param status: Pod 状态
        """
        try:
            # 使用预先创建的应用上下文
            with self._app_context:
                sse.publish({
                    'workspace_name': self.workspace_name,
                    'status': status
                })
            print(f"Published status: {status}")
        except Exception as e:
            print(f"发布状态时发生错误: {e}")

    def start(self):
        """
        启动 Pod 状态追踪
        在后台线程中运行
        """
        thread = threading.Thread(
            target=self._track_pod_status, 
            daemon=True
        )
        thread.start()
        return thread

    def stop(self):
        """
        停止 Pod 状态追踪
        """
        self._stop_event.set()
