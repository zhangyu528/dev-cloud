from flask_sqlalchemy import SQLAlchemy
import logging.config

# 创建全局 SQLAlchemy 实例
db = SQLAlchemy()

def logging_init_app(app):
    """Initialize logging with the Flask app"""
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
    migrate.init_app(app, db, directory=app.config['MIGRATIONS_DIR'])

def jwt_init_app(app):
    """Initialize JWTManager with the Flask app"""
    from flask_jwt_extended import JWTManager
    jwt = JWTManager(app)

def swagger_init_app(app):
    """Initialize Swagger with the Flask app"""
    from flasgger import Swagger
    swagger = Swagger(app, 
                     template=app.config['SWAGGER_TEMPLATE'],
                     config=app.config['SWAGGER_CONFIG'])

def cors_init_app(app):
    """Initialize CORS with the Flask app"""
    from flask_cors import CORS
    cors = CORS(app, **app.config['CORS_CONFIG'])
