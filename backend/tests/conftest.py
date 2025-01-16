import pytest

from flask import Flask
from config import UnitTestConfig


@pytest.fixture(scope='session')
def client():
    # 创建 Flask 应用
    app = Flask(__name__)
    # 使用单元测试配置
    app.config.from_object(UnitTestConfig)

    # 初始化数据库
    from extensions import db_init_app
    db_init_app(app)

    # 初始化蓝图
    from api import bp_init_app
    bp_init_app(app)

    # 初始化 JWT
    from extensions import jwt_init_app
    jwt_init_app(app)
        
    # 创建测试客户端
    with app.test_client() as client:
        # 创建应用上下文
        with app.app_context():
            from extensions import db
            # 创建数据库表
            db.create_all()
            yield client
            # 清理数据库
            db.drop_all()

@pytest.fixture
def jwt_token(client):
    """生成测试用的JWT token"""
    from flask_jwt_extended import create_access_token
    
    # 创建测试用户ID
    test_user_id = 'test_user_123'
    
    # 生成access token
    access_token = create_access_token(identity=test_user_id)
    
    return access_token
