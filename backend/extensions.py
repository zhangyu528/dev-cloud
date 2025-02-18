from flask_sqlalchemy import SQLAlchemy
# 创建全局 SQLAlchemy 实例
db = SQLAlchemy()


def logging_init_app(app):
    """Initialize logging with the Flask app"""
    import logging.config
    if 'LOGGING_CONFIG' in app.config:
        logging.config.dictConfig(app.config['LOGGING_CONFIG'])

def db_init_app(app):
    """Initialize extensions with the Flask app"""
    # Configure SQLAlchemy
    db.init_app(app)
    
def migrate_init_app(app):
    """Initialize Flask-Migrate with the Flask app"""
    from flask_migrate import Migrate
    # 创建全局 Migrate 实例
    migrate = Migrate()
    migrate.init_app(app, db)

def jwt_init_app(app):
    """Initialize JWTManager with the Flask app"""
    from flask_jwt_extended import JWTManager
    jwt = JWTManager(app)


def cors_init_app(app):
    """Initialize CORS with the Flask app"""
    from flask_cors import CORS
    cors = CORS(app, **app.config['CORS_CONFIG'])

def restx_init_app(app):
    """Initialize RESTX API with the Flask app"""
    from flask_restx import Api
    api = Api(
        app,
        version='1.0',
        title='DevCloud API',
        description='开发者云平台接口文档',
        doc='/docs',
        security='Bearer Auth',
        authorizations={
            'Bearer Auth': {
                'type': 'apiKey', 
                'in': 'header',
                'name': 'Authorization'
            }
        }
    )
    # 延迟导入避免循环依赖
    from api import register_namespaces  
    register_namespaces(api)

def sse_init_app(app):
    """Initialize SSE with the Flask app"""
    from flask_sse import sse
    app.register_blueprint(sse, url_prefix='/stream')

    # 添加调试日志
    # @app.route('/stream', methods=['GET'])
    # def debug_stream():
    #     app.logger.debug('SSE Stream endpoint accessed')
    #     return sse.stream()
