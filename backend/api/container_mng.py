# backend/api/container_mng.py

import docker
from flask import Flask, jsonify, request
from backend.api import api_bp
from .templates import TEMPLATES

app = Flask(__name__)
docker_client = docker.from_env()



@api_bp.route('/container/create', methods=['POST'])
def create_container():
    # 获取请求数据
    data = request.get_json()
    template_name = data.get("template")
    resource_limits = data.get("resource_limits", {})
    environment_vars = data.get("environment_vars", {})
    
    # 验证模板
    if template_name not in TEMPLATES:
        return jsonify({"status": "error", "message": "Invalid template name."}), 400
    
    template = TEMPLATES[template_name]

    try:
        # 创建容器
        container = docker_client.containers.run(
            image=template["image"],
            command=template["default_cmd"],
            environment={**template["env_vars"], **environment_vars},
            ports=template["ports"],
            detach=True,
            name=f"{template_name}-container",
            mem_limit=resource_limits.get("memory", None),
            cpu_count=int(resource_limits.get("cpu", 0)),
        )
        return jsonify({
            "status": "success",
            "container_id": container.id,
            "message": "Container created successfully."
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

















@api_bp.route('/stop_container', methods=['POST'])
def stop_container():
    container_id = request.json.get('container_id')
    try:
        container = client.containers.get(container_id)
        container.stop()
        return jsonify({"status": "success", "message": f"Container {container_id} stopped."}), 200
    except docker.errors.NotFound:
        return jsonify({"status": "error", "message": "Container not found."}), 404


@api_bp.route('/containers', methods=['GET'])
def list_containers():
    """列出所有正在运行的容器"""
    containers = client.containers.list()
    containers_info = [
        {
            'id': container.id,
            'name': container.name,
            'status': container.status
        }
        for container in containers
    ]
    return jsonify(containers_info)

@apapi_bpp.route('/container/<container_id>', methods=['GET'])
def get_container(container_id):
    """获取指定容器的信息"""
    try:
        container = client.containers.get(container_id)
        container_info = {
            'id': container.id,
            'name': container.name,
            'status': container.status,
            'image': container.image.tags,
            'created': container.attrs['Created'],
            'ports': container.attrs['NetworkSettings']['Ports']
        }
        return jsonify(container_info)
    except docker.errors.NotFound:
        return jsonify({'error': 'Container not found'}), 404


@api_bp.route('/container/<container_id>', methods=['DELETE'])
def remove_container(container_id):
    """删除指定的容器"""
    try:
        container = client.containers.get(container_id)
        container.remove(force=True)
        return jsonify({'message': 'Container removed'}), 200
    except docker.errors.NotFound:
        return jsonify({'error': 'Container not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
