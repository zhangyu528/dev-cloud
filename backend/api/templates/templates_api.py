from flask import Blueprint, request, jsonify
from .templates import TEMPLATES

templates_bp = Blueprint('templates_bp', __name__)

@templates_bp('/available-templates', methods=['GET'])
def available_templates():
    """
    获取可用的开发环境模板
    ---
    tags:
      - 模板管理
    summary: 获取开发环境模板列表
    description: 返回系统中所有预配置的开发环境模板信息
    responses:
      200:
        description: 成功获取模板列表
        schema:
          type: object
          properties:
            templates:
              type: object
              description: 模板字典
              additionalProperties:
                type: object
                properties:
                  name:
                    type: string
                    description: 模板名称
                    example: "python-django"
                  description:
                    type: string
                    description: 模板描述
                    example: "预配置 Django 开发环境"
                  image:
                    type: string
                    description: Docker 镜像
                    example: "python:3.9-django"
                  ports:
                    type: array
                    description: 开放端口
                    items:
                      type: string
                      example: "8000/tcp"
    """
    return jsonify(TEMPLATES), 200