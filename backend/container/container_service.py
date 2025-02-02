import os
import docker
import docker.errors
from flask import current_app

def run_docker_container(project_name, template_name):
    formatted_template_name = template_name.lower().replace(" ", "-")
    client = docker.from_env()
    try:
        """运行 Docker 容器"""
        current_app.logger.debug("🚀 创建容器开始")
        image_name = f"{formatted_template_name}"
        current_app.logger.debug(f"使用 {image_name} 镜像运行 Docker 容器")
        current_app.logger.debug(f"创建的容器名称 {project_name}")
        client.containers.run(
            image_name, 
            name=project_name,  # 容器名称
            ports={'4200/tcp':4200},
            environment={"PROJECT_NAME": project_name},
            detach=True)            
        current_app.logger.debug("✅ 容器创建成功")
    except docker.errors.ContainerError as e:
        current_app.logger.debug(f"Error running Docker container: {e}")
