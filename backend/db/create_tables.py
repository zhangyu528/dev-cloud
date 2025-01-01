import os
import sys
import traceback
from flask import Flask

try:
    from backend.db import db
    from backend.db.models.user import User
    from backend.db.models.container import Container   
    from backend.config import DevelopmentConfig

    # 获取当前 db 目录的绝对路径
    db_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 创建 database 文件夹（如果不存在）
    database_dir = os.path.join(db_dir, 'database')
    os.makedirs(database_dir, exist_ok=True)
    
    # 创建 Flask 应用
    app = Flask(__name__)
    
    # 加载配置
    # app.config.from_object(DevelopmentConfig)
    
    # 设置数据库 URI（在 db/database 文件夹内）
    db_path = os.path.join(database_dir, 'dev_database.db')
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # 初始化数据库
    db.init_app(app)

    # 使用应用上下文
    with app.app_context():
        # 创建所有数据库模型对应的表
        db.create_all()  
        print(f"Tables created successfully! Database located at: {db_path}")
except Exception as e:
    print(f"Error creating tables: {e}")
    print("Detailed traceback:")
    traceback.print_exc()
    sys.exit(1)