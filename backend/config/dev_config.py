class DevelopmentConfig:
    # 基础配置
    DEBUG = False
    TESTING = False
    SECRET_KEY = 'your-secret-key'  # 建议使用随机生成的安全密钥
    
    # 数据库配置（如果需要）
    SQLALCHEMY_DATABASE_URI = 'sqlite:///dev_database.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False