from flask import jsonify
from templates import TEMPLATES
from . import api_bp


@api_bp.route('/available-templates', methods=['GET'])
def available_templates():
    """
    返回所有可用的容器模板
    """
    return jsonify(TEMPLATES), 200