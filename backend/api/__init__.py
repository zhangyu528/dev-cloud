# backend/api/__init__.py
from flask import Blueprint

# 创建全局蓝图
api_bp = Blueprint('api', __name__)

# 导入路由模块
from .auth.github_auth_api import github_auth_bp
from .templates.templates_api import templates_bp
from .user.user_api import user_bp
from .user.verify_and_login_code_api import verify_and_login_code_bp

def bp_init_app(app):
    # 注册蓝图
    app.register_blueprint(api_bp, url_prefix='/api')
    app.register_blueprint(github_auth_bp, url_prefix='/api/auth')
    app.register_blueprint(templates_bp, url_prefix='/api/templates')
    app.register_blueprint(user_bp, url_prefix='/api/user')
    app.register_blueprint(verify_and_login_code_bp, url_prefix='/api/user')
