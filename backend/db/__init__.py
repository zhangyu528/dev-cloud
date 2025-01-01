# /d:/工作/dev-cloud/backend/db/__init__.py
# You can add any additional database-related initializations here
from flask_sqlalchemy import SQLAlchemy


# 延迟初始化 db
db = SQLAlchemy()