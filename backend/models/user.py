from extensions import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    is_active = db.Column(db.Boolean, default=False)  # 是否已验证激活
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    
    # GitHub OAuth fields
    github_id = db.Column(db.String(100), unique=True, nullable=True)
    github_access_token = db.Column(db.String(200), nullable=True)
    github_profile = db.Column(db.JSON, nullable=True)
