import os
import docker
import docker.errors
from flask import current_app

def create_container(project_name, template_name):
    formatted_template_name = template_name.lower().replace(" ", "-")
    client = docker.from_env()
    try:
        """运行 Docker 容器"""
        current_app.logger.debug("🚀 创建容器开始")
        image_name = f"{formatted_template_name}"
        current_app.logger.debug(f"使用 {image_name} 镜像运行 Docker 容器")
        current_app.logger.debug(f"创建的容器名称 {project_name}")
        client.containers.create(
            image_name, 
            name=project_name,  # 容器名称
            ports={'4200/tcp':4200},
            environment={"PROJECT_NAME": project_name},
            detach=True)            
        current_app.logger.debug("✅ 容器创建成功")
    except docker.errors.ContainerError as e:
        current_app.logger.debug(f"Error running Docker container: {e}")

def start_container(project_name):
    client = docker.from_env()
    try:
        """运行 Docker 容器"""
        current_app.logger.debug("🚀 容器开始start")
        current_app.logger.debug(f"start容器名称 {project_name}")
        container = client.containers.get(project_name)
        container.start()          
        current_app.logger.debug("✅ 容器start成功")
    except docker.errors.ContainerError as e:
        current_app.logger.debug(f"Error running Docker container: {e}")

def stop_container(project_name):
    client = docker.from_env()
    try:
        """停止 Docker 容器"""
        current_app.logger.debug("🚀  容器开始 stop")
        current_app.logger.debug(f"stop容器名称 {project_name}")
        container = client.containers.get(project_name)
        container.stop()          
        current_app.logger.debug("✅  容器 stop成功")
    except docker.errors.ContainerError as e:
        current_app.logger.debug(f"Error running Docker container: {e}")

def delete_container(project_name):
    client = docker.from_env()
    try:
        """删除 Docker 容器"""
        current_app.logger.debug("🚀   容器开始 delete")
        current_app.logger.debug(f"delete容器名称 {project_name}")
        container = client.containers.get(project_name)
        container.remove(force=True)          
        current_app.logger.debug("✅ 容器 delete成功")
    except docker.errors.ContainerError as e:
        current_app.logger.debug(f"Error running Docker container: {e}")