import os
import sys
import traceback
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from backend.config import DevelopmentConfig
from backend.db.models import User, Container
from backend.extensions import db

if __name__ == '__main__':
    # 创建 Flask 应用
    app = Flask(__name__)
    # 加载配置
    app.config.from_object(DevelopmentConfig)

    # 初始化数据库
    db.init_app(app)
    # 使用应用上下文
    with app.app_context():
        # 创建所有数据库模型对应的表
        db.create_all()  
        print(f"Tables created successfully!")
