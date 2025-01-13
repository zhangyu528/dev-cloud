import os

class TestDatabaseConfig:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///test.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False

    # 动态设置迁移目录
    MIGRATIONS_DIR = 'backend/db/test/migrations'