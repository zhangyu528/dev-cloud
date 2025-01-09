class TestConfig:
    # 基础配置
    DEBUG = False
    TESTING = False
    SECRET_KEY = 'test-secret-key-1234567890'
    JWT_SECRET_KEY = 'test-jwt-secret-key-1234567890'
    JWT_ACCESS_TOKEN_EXPIRES = 3600  # 1 hour
    
    # 数据库配置（如果需要）
    SQLALCHEMY_DATABASE_URI = 'sqlite:///test_database.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
