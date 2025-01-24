from .user import *
from .templates import *
from .auth import *

def bp_init_app(app):
    # 注册蓝图
    app.register_blueprint(github_auth_bp, url_prefix='/api/auth')
    app.register_blueprint(user_bp, url_prefix='/api/user')
    app.register_blueprint(templates_bp, url_prefix='/api/templates')

