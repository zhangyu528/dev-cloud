from flask import request, jsonify
import os
import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token

from backend.db.models import VerificationCode
from backend.db.models import User
from backend.extensions import db

from . import api_bp
from .status_codes import get_status_response

SMTP_SERVER = "smtp.gmail.com"  # Change this according to your email provider
SMTP_PORT = 587
SMTP_USERNAME = os.getenv('SMTP_USERNAME')
SMTP_PASSWORD = os.getenv('SMTP_PASSWORD')

def generate_verification_code():
    """Generate a 6-digit verification code"""
    return str(random.randint(100000, 999999))

def send_verification_email(to_email, code):
    """Send verification code via email"""
    message = MIMEMultipart()
    message["From"] = SMTP_USERNAME
    message["To"] = to_email
    message["Subject"] = "Email Verification Code"
    
    body = f"""
    Your verification code is: {code}
    
    This code will expire in 10 minutes.
    If you didn't request this code, please ignore this email.
    """
    
    message.attach(MIMEText(body, "plain"))
    
    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(message)
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

@api_bp.route('/send-verification-code', methods=['POST'])
def send_verification_code():
    """
    发送邮箱验证码
    ---
    tags:
      - 验证码
    summary: 发送邮箱验证码
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          properties:
            email:
              type: string
              description: 邮箱地址
              example: "user@example.com"
            username:
              type: string
              description: 用户名(可选)
              example: "johndoe"
    responses:
      200:
        description: 验证码发送成功
      400:
        description: 邮箱格式错误或发送失败
    """
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    
    if not email:
        response, status_code = get_status_response('EMAIL', 'INVALID_EMAIL')
        return jsonify(response), status_code

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
                login_type='email',
                is_active=False
            )
            db.session.add(user)
        
        # 保存验证码
        code_obj = VerificationCode(
            email=email,
            code=verification_code,
        )
        db.session.add(code_obj)
        db.session.commit()
        
        # 发送验证码邮件
        if send_verification_email(email, verification_code):
            response, status_code = get_status_response('EMAIL', 'VERIFICATION_CODE_SENT')
            return jsonify(response), status_code
        
        db.session.rollback()
        response, status_code = get_status_response('EMAIL', 'EMAIL_SENDING_FAILED')
        return jsonify(response), status_code
        
    except Exception as e:
        db.session.rollback()
        response, status_code = get_status_response('EMAIL', 'EMAIL_SENDING_FAILED')
        return jsonify(response), status_code

@api_bp.route('/verify-and-login', methods=['POST'])  # 更新路由路径
def verify_and_login_code():
    """
    验证邮箱验证码并登录
    ---
    tags:
      - 验证码
    summary: 验证邮箱验证码并登录
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          properties:
            email:
              type: string
              description: 邮箱地址
              example: "user@example.com"
            code:
              type: string
              description: 验证码
              example: "123456"
    responses:
      200:
        description: 验证成功并登录
        schema:
          type: object
          properties:
            error_code:
              type: string
            message:
              type: string
            access_token:
              type: string
            username:
              type: string
      400:
        description: 验证码无效或已过期
      404:
        description: 未找到验证码记录
    """
    data = request.get_json()
    email = data.get('email')
    code = data.get('code')
    
    if not email or not code:
        response, status_code = get_status_response('EMAIL', 'INVALID_EMAIL')
        return jsonify(response), status_code
    
    # 使用重命名后的方法
    verification = VerificationCode.verify_and_invalidate(email, code)
    
    if not verification:
        response, status_code = get_status_response('EMAIL', 'INVALID_VERIFICATION_CODE')
        return jsonify(response), status_code
    
    try:
        # 验证成功后激活用户并登录
        user = User.query.filter_by(email=verification.email).first()
        if user:
            user.is_active = True
            db.session.delete(verification)
            db.session.commit()
            
            # 创建访问令牌
            access_token = create_access_token(identity=user.id)
            
            response, status_code = get_status_response('EMAIL', 'VERIFICATION_CODE_SUCCESS')
            response_data = {
                'error_code': response['error_code'],
                'message': response['message'],
                'access_token': access_token,
                'username': user.username
            }
            return jsonify(response_data), status_code
            
    except Exception as e:
        db.session.rollback()
        response, status_code = get_status_response('EMAIL', 'EMAIL_SENDING_FAILED')
        return jsonify(response), status_code

    response, status_code = get_status_response('EMAIL', 'VERIFICATION_CODE_SUCCESS')
    return jsonify(response), status_code
