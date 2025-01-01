from flask import Flask
from flask_cors import CORS  # 用于解决跨域问题，如果前端和后端分开部署
from backend.api import api_bp  # 导入 api 模块
from backend.config import Config

# 创建 Flask 应用
app = Flask(__name__)


# 加载配置（如数据库、Docker 配置等）
app.config.from_object(Config)

# 允许跨域请求（适用于前后端分离的项目）
CORS(app)

# 注册蓝图 (Blueprint)，这里的 'api_bp' 包含了所有的路由和容器管理业务
app.register_blueprint(api_bp, url_prefix='/api')  # 所有 API 路由都会以 /api 为前缀





if __name__ == '__main__':
    # 启动 Flask 应用
    app.run(host='0.0.0.0', port=5000)
