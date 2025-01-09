import os
import sys
import pytest

from flask import Flask
from flask_cors import CORS  # 用于解决跨域问题，如果前端和后端分开部署
from flask import Blueprint
from flask_jwt_extended import JWTManager

from backend.api import api_bp  # 从 api 包导入蓝图
from backend.extensions import db
from backend.config import TestConfig


@pytest.fixture(scope='session')
def client():
    # 创建 Flask 应用
    app = Flask(__name__)
    # 配置测试环境
    app.config.from_object(TestConfig)
    db.init_app(app)

    # 所有 API 路由都会以 /api 为前缀
    app.register_blueprint(api_bp, url_prefix='/api')  
    # 初始化 JWT
    jwt = JWTManager(app)  
    # 添加跨域支持
    CORS(app)

    # 创建测试客户端
    with app.test_client() as client:
        # 创建应用上下文
        with app.app_context():
            yield client

@pytest.fixture
def jwt_token(client):
    """生成测试用的JWT token"""
    from flask_jwt_extended import create_access_token
    
    # 创建测试用户ID
    test_user_id = 'test_user_123'
    
    # 生成access token
    access_token = create_access_token(identity=test_user_id)
    
    return access_token
