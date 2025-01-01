from app import db  # 导入 db 实例
from datetime import datetime  # 导入 datetime 模块

class Container(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # 容器的唯一标识符
    name = db.Column(db.String(128), unique=True, nullable=False)  # 容器名称
    status = db.Column(db.String(64), nullable=False)  # 容器的状态 (如 running, stopped)
    image = db.Column(db.String(256), nullable=False)  # 使用的镜像名称
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # 容器创建时间
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)  # 容器更新时间
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))  # 所属用户ID
    user = db.relationship('User', back_populates='containers')  # 定义与 User 表的关系

    def __repr__(self):
        return f"<Container(name={self.name}, status={self.status}, image={self.image})>"