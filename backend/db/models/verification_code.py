from datetime import datetime, timedelta, timezone
from backend.extensions import db

class VerificationCode(db.Model):
    __tablename__ = 'verification_codes'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    code = db.Column(db.String(6), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    expires_at = db.Column(db.DateTime, nullable=False)
    is_used = db.Column(db.Boolean, default=False)

    def __init__(self, email, code, expires_in_minutes=10):
        self.email = email
        self.code = code
        self.created_at = datetime.now(timezone.utc)
        self.expires_at = datetime.now(timezone.utc) + timedelta(minutes=expires_in_minutes)

    @classmethod
    def get_valid_code(cls, email, code):
        return cls.query.filter_by(
            email=email,
            code=code,
            is_used=False
        ).filter(cls.expires_at > datetime.now(timezone.utc)).first()