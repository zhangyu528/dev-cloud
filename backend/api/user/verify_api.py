from flask import request, jsonify
from flask import Blueprint
from ..utils.util import validate_email_format, generate_verification_code, send_verification_email
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token
from flask import current_app

from models.verification_code import VerificationCode
from models.user import User
from extensions import db

from ..status_codes import get_server_error_response

from .user_api import user_bp

@user_bp.route('/send_verification_code', methods=['POST'])
def send_verification_code():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    
    # Validate email format using utility function
    validated_email = validate_email_format(email)
    if not validated_email:
        return jsonify({}), 400, {'X-Message': 'Invalid email address'}
    
    email = validated_email  # Use normalized email

    # 如果没有提供username，使用邮箱前缀
    if not username:
        username = email.split('@')[0]

    verification_code = generate_verification_code()
    
    try:
        # 查找或创建用户
        user = User.query.filter_by(email=email).first()
        if not user:
            user = User(
                username=username,
                email=email,
                is_active=False
            )
            db.session.add(user)
        
        # 保存验证码
        code_obj = VerificationCode(
            email=email,
            code=verification_code,
        )
        current_app.logger.debug(f"Verification code: {verification_code}")

        db.session.add(code_obj)
        db.session.commit()

        # 发送验证码邮件
        if send_verification_email(email, verification_code):
            return jsonify({}), 200
        
        db.session.rollback()
        return jsonify({}), 400, {'X-Message': 'Failed to send verification code'}
        
    except Exception as e:
        db.session.rollback()
        return get_server_error_response()

@user_bp.route('/verify_and_login', methods=['POST'])
def verify_and_login():
    
    data = request.get_json()
    email = data.get('email')
    code = data.get('code')
    
    if not email or not code:
        return jsonify({}), 400, {'X-Message': 'Miss email address'}
    
    verification = VerificationCode.verify_and_invalidate(email, code)
    
    if not verification:
        return jsonify({}), 400, {'X-Message': 'Invalid verification code'}
    
    try:
        # 验证成功后激活用户并登录
        user = User.query.filter_by(email=verification.email).first()
        if user:
            user.is_active = True
            db.session.delete(verification)
            db.session.commit()
            
            # 创建访问令牌
            access_token = create_access_token(identity=user.id)
            response = {
                'access_token': access_token,
                'username': user.username
            }
            return jsonify(response), 200
        else:
            return jsonify({}), 400, {'X-Message': 'Invalid verification code'}
    except Exception as e:
        db.session.rollback()
        return get_server_error_response()
