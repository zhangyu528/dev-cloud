# backend/api/__init__.py
# 空文件，也可以用来标识目录为包

from . import container_mng, templates_mng

# 创建 Flask 蓝图
api_bp = Blueprint('api', __name__)