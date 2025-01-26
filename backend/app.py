import logging
from flask import Flask

logger = logging.getLogger(__name__)

def create_app(config=None):
    """Application factory function"""
    app = Flask(__name__)
        
    # 加载配置
    if config is None:
        from config import DevelopmentConfig
        app.config.from_object(DevelopmentConfig)
    else:
        app.config.from_object(config)

    # 初始化日志
    from extensions import logging_init_app
    logging_init_app(app)

    # 初始化扩展
    from extensions import db_init_app
    db_init_app(app)

    from extensions import migrate_init_app
    migrate_init_app(app)

    from extensions import jwt_init_app
    jwt_init_app(app)

    from extensions import cors_init_app
    cors_init_app(app)

    # 初始化RESTX API
    from extensions import restx_init_app
    restx_init_app(app)

    # # 初始化请求日志
    # from api.middleware.logging import init_request_logging
    # init_request_logging(app)

    logger.info("App Extensions initialized")
    return app

logger.info("App Factory loaded")
app = create_app()

if __name__ == "__main__":
    # 启动 Flask 应用
    import os
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'# 允许http请求
    app.run(host='0.0.0.0', port=5000)
