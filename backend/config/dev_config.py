import os
from .swagger_config import swagger_template, swagger_config

class DevelopmentConfig:
    # 基础配置
    DEBUG = False
    TESTING = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-default-secret-key')  # 使用环境变量管理密钥
    
    # 数据库配置（如果需要）
    SQLALCHEMY_DATABASE_URI = 'sqlite:///dev_database.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT 配置
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your-default-jwt-secret-key')
    JWT_ACCESS_TOKEN_EXPIRES = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES', 3600))  # 过期时间（秒）

     # Swagger 开发环境特定配置
    SWAGGER_TEMPLATE = {
        **swagger_template,  # 继承基础模板
        "info": {
            "title": "DevCloud Development API",
            "description": "DevCloud 开发环境 API 文档",
            "version": "1.0.0",
            "contact": {
                "name": "DevCloud 生产支持团队",
                "email": "support@devcloud.com",
                "url": "https://www.devcloud.com/support"
            }
        },
        "host": "localhost:5000",  # 生产域名
        "basePath": "/api",  # API 版本路径
        "schemes": ["http"],  # 仅使用 HTTPS
        
        # 额外的生产环境安全定义
        "securityDefinitions": {
            "Bearer": {
                "type": "apiKey",
                "name": "Authorization",
                "in": "header",
                "description": "使用 JWT 进行身份验证。格式为: Bearer {token}"
            }
        },
        
        # 默认全局安全要求
        "security": [
            {
                "Bearer": []
            }
        ]
    }

    # Swagger UI 配置
    SWAGGER_CONFIG = {
        **swagger_config,  # 继承基础配置
        "specs_route": "/docs/",  # 文档访问路径
        "specs": [
            {
                "endpoint": 'production-api',
                "route": '/production-api.json',
                "description": "生产环境 API 规范"
            }
        ],
        "static_url_path": "/swagger-static",  # 静态文件路径
        "swagger_ui": True,  # 启用 Swagger UI
        "swagger_ui_debug": False,  # 生产环境关闭调试
        "swagger_ui_config": {
            "deepLinking": True,  # 启用深度链接
            "displayOperationId": False,  # 不显示操作 ID
            "defaultModelsExpandDepth": 1,  # 模型展开深度
            "defaultModelExpandDepth": 1,
            "defaultModelRendering": "example",
            "displayRequestDuration": False,
            "filter": False,
            "operationsSorter": "alpha",
            "tagsSorter": "alpha",
            "showExtensions": False,
            "showCommonExtensions": False
        }
    }
    
    # 其他生产环境特定配置
    CORS_ORIGINS = [
        "https://www.devcloud.com",
        "https://admin.devcloud.com"
    ]
    
    # 日志配置
    LOGGING_CONFIG = {
        'version': 1,
        'disable_existing_loggers': False,
        'formatters': {
            'standard': {
                'format': '%(asctime)s [%(levelname)s] %(name)s: %(message)s'
            },
        },
        'handlers': {
            'file': {
                'level': 'ERROR',
                'class': 'logging.FileHandler',
                'filename': '/var/log/devcloud/api.log',
                'formatter': 'standard'
            }
        },
        'loggers': {
            '': {  # root logger
                'handlers': ['file'],
                'level': 'ERROR',
                'propagate': True
            }
        }
    }