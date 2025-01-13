import os

class DevDatabaseConfig:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///dev.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_ECHO = True

    # 动态设置迁移目录
    MIGRATIONS_DIR = 'backend/db/migrations'