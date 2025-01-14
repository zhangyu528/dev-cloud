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

    # 注册蓝图
    from api import bp_init_app
    bp_init_app(app)

    from extensions import db_init_app
    db_init_app(app)

    from extensions import migrate_init_app
    migrate_init_app(app)

    from extensions import jwt_init_app
    jwt_init_app(app)

    from extensions import swagger_init_app
    swagger_init_app(app)

    from extensions import cors_init_app
    cors_init_app(app)

    # 初始化请求日志
    from api.middleware.logging import init_request_logging
    app = init_request_logging(app)

    logger.info("App Extensions initialized")
    return app

app = create_app()

if __name__ == "__main__":
    # 启动 Flask 应用
    app.run(host='0.0.0.0', port=5000)
