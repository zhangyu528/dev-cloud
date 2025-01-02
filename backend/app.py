from flask import Flask
from flask_cors import CORS  # 用于解决跨域问题，如果前端和后端分开部署
from flask import Blueprint
from flask_jwt_extended import JWTManager  # 添加 JWT 管理器
from flasgger import Swagger  # 添加 Swagger

from backend.extensions import db
from backend.api import api_bp  # 从 api 包导入蓝图
from backend.config import DevelopmentConfig

# 创建 Flask 应用
app = Flask(__name__)
# 初始化 SQLAlchemy
db.init_app(app)  
app.config.from_object(DevelopmentConfig)  # 加载配置

# 所有 API 路由都会以 /api 为前缀
app.register_blueprint(api_bp, url_prefix='/api')  
# 初始化 JWT
jwt = JWTManager(app)

 # Swagger 配置
swagger_template = app.config.get('SWAGGER_TEMPLATE')
swagger_config = app.config.get('SWAGGER_CONFIG')

if swagger_template and swagger_config:
    Swagger(app, 
            template=swagger_template,
            config=swagger_config)

CORS(app)   # 添加跨域支持

if __name__ == '__main__':
    # 启动 Flask 应用
    app.run(host='0.0.0.0', port=5000)
