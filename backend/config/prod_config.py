class ProductionConfig:
    # CORS 允许的源
    CORS_ORIGINS = [
        "https://www.devcloud.com",
        "https://admin.devcloud.com"
    ]
    
    # 基础配置
    DEBUG = False
    TESTING = False
    SECRET_KEY = 'your-secret-key'  # 建议使用随机生成的安全密钥
    
    # 数据库配置（如果需要）
    SQLALCHEMY_DATABASE_URI = 'sqlite:///prod_database.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
