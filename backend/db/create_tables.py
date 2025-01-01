from app import app, db  # 导入 app 和 db
from db.methods import User   # 导入模型
from db.models import Container  # 导入模型

# 通过 Flask 应用上下文来创建数据库表
with app.app_context():
    db.create_all()  # 创建所有数据库模型对应的表
    print("Tables created successfully!")
