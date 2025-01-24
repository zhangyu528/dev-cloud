from flask import Blueprint, request, jsonify
from .templates import TEMPLATES

templates_bp = Blueprint('templates_bp', __name__)

@templates_bp.route('/available-templates', methods=['GET'])
def available_templates():
    return jsonify(TEMPLATES), 200
