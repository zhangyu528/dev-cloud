# backend/api/__init__.py
# 空文件，也可以用来标识目录为包

from flask import Blueprint

# 创建全局蓝图
api_bp = Blueprint('api', __name__)

# 导入路由模块，确保路由被注册
from . import user_api
# from . import container_api
from . import templates_api
