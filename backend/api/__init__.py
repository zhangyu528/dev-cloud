# backend/api/__init__.py
# 空文件，也可以用来标识目录为包

from flask import Blueprint

# 创建全局蓝图
api_bp = Blueprint('api', __name__)

# 导入路由模块，确保路由被注册
from . import user_api
from . import verify_and_login_code_api
from . import github_auth_api

def bp_init_app(app):
    app.register_blueprint(api_bp, url_prefix='/api')
    app.register_blueprint(github_auth_api.github_auth_bp, url_prefix='/api')
