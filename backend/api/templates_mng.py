from flask import Flask, jsonify
from templates import TEMPLATES
from . import api_bp

app = Flask(__name__)

@api_bp.route('/available-templates', methods=['GET'])
def available_templates():
    """
    返回所有可用的容器模板
    """
    return jsonify(TEMPLATES), 200

if __name__ == '__main__':
    app.run(debug=True)
