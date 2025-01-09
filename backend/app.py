from flask import Flask
from flask_cors import CORS  # 用于解决跨域问题，如果前端和后端分开部署
from flask import Blueprint
from flask_jwt_extended import JWTManager  # 添加 JWT 管理器
from flasgger import Swagger  # 添加 Swagger
from flask import request  # 用于记录请求信息

from backend.extensions import db
from backend.api import api_bp  # 从 api 包导入蓝图
from backend.config import DevelopmentConfig

# 重要：导入所有模型
from backend.db.models.user import User
from backend.db.models.verification_code import VerificationCode

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

CORS(app,
    resources={
        r"/api/*": {
            "origins": ["http://localhost:3000"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True
        }
    })   # 添加跨域支持

@app.after_request
def log_request_and_response(response):
    # 尝试从 JSON 响应中提取 msg
    if response.is_json:
        data = response.get_json()
        msg = data.get("message", "No message found")
    else:
        msg = "Response is not JSON"
    
    # 记录日志
    app.logger.info(
        f"URL: {request.url} | Status Code: {response.status_code} | Msg: {msg}"
    )
    return response

if __name__ == '__main__':
     # 使用应用上下文
    with app.app_context():
        # 创建所有数据库模型对应的表
        db.create_all()  
        # 启动 Flask 应用
    app.run(host='0.0.0.0', port=5000)
