from datetime import datetime, timedelta, timezone
from extensions import db

class VerificationCode(db.Model):
    __tablename__ = 'verification_codes'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    code = db.Column(db.String(6), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    expires_at = db.Column(db.DateTime, nullable=False)

    def __init__(self, email, code, expires_in_minutes=10):
        self.email = email
        self.code = code
        self.created_at = datetime.now(timezone.utc)
        self.expires_at = datetime.now(timezone.utc) + timedelta(minutes=expires_in_minutes)

    @classmethod
    def verify_and_invalidate(cls, email, code):
        """
        验证码校验并使其失效
        Args:
            email: 邮箱
            code: 验证码
        Returns:
            验证通过返回验证码对象，否则返回None
        """
        valid_code = cls.query.filter_by(
            email=email,
            code=code
        ).filter(cls.expires_at > datetime.now(timezone.utc)).first()
        
        if valid_code:
            valid_code.expires_at = datetime.now(timezone.utc)
            db.session.commit()
            
        return valid_code