from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flasgger import Swagger
from flask_cors import CORS

# 创建全局 SQLAlchemy 实例
db = SQLAlchemy()

# 创建全局 Migrate 实例
migrate = Migrate()

def db_init_app(app):
    """Initialize extensions with the Flask app"""
    # Configure SQLAlchemy
    db.init_app(app)
    
    # 初始化 Flask-Migrate
    migrate.init_app(app, db, directory=app.config['MIGRATIONS_DIR'])


def jwt_init_app(app):
    """Initialize JWTManager with the Flask app"""
    jwt = JWTManager(app)

def swagger_init_app(app):
    """Initialize Swagger with the Flask app"""
    swagger = Swagger(app, 
                     template=app.config['SWAGGER_TEMPLATE'],
                     config=app.config['SWAGGER_CONFIG'])

def cors_init_app(app):
    """Initialize CORS with the Flask app"""
    cors = CORS(app, **app.config['CORS_CONFIG'])
