from flask import request, jsonify
import os
import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta, timezone

from backend.db.models.verification_code import VerificationCode
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
    responses:
      200:
        description: 验证码发送成功
      400:
        description: 邮箱格式错误或发送失败
    """
    data = request.get_json()
    email = data.get('email')
    
    if not email:
        response, status_code = get_status_response('EMAIL', 'INVALID_EMAIL')
        return jsonify(response), status_code
    
    verification_code = generate_verification_code()
    
    try:
        # First save to database
        code_obj = VerificationCode(email=email, code=verification_code)
        db.session.add(code_obj)
        db.session.commit()
        
        # Only send email if save succeeds
        if send_verification_email(email, verification_code):
            response, status_code = get_status_response('EMAIL', 'VERIFICATION_CODE_SENT')
            return jsonify(response), status_code
        
        # If email fails, delete saved code
        db.session.delete(code_obj)
        db.session.commit()
        response, status_code = get_status_response('EMAIL', 'EMAIL_SENDING_FAILED')
        return jsonify(response), status_code
        
    except Exception as e:
        db.session.rollback()
        response, status_code = get_status_response('EMAIL', 'EMAIL_SENDING_FAILED')
        return jsonify(response), status_code

@api_bp.route('/verify-code', methods=['POST'])
def verify_code():
    """
    验证邮箱验证码
    ---
    tags:
      - 验证码
    summary: 验证邮箱验证码
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
        description: 验证码验证成功
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
    
    # 查找最新的验证码记录
    verification = VerificationCode.query.filter_by(
        email=email
    ).order_by(
        VerificationCode.created_at.desc()
    ).first()
    
    if not verification:
        response, status_code = get_status_response('EMAIL', 'INVALID_VERIFICATION_CODE')
        return jsonify(response), status_code
    
    # 检查是否过期 (10分钟)
    if datetime.now(timezone.utc) - verification.created_at > timedelta(minutes=10):
        # 删除过期的验证码
        db.session.delete(verification)
        db.session.commit()
        response, status_code = get_status_response('EMAIL', 'VERIFICATION_CODE_EXPIRED')
        return jsonify(response), status_code
    
    # 验证码匹配检查
    if verification.code != code:
        response, status_code = get_status_response('EMAIL', 'INVALID_VERIFICATION_CODE')
        return jsonify(response), status_code
    
    # 验证成功，删除已使用的验证码
    db.session.delete(verification)
    db.session.commit()
    
    response, status_code = get_status_response('EMAIL', 'VERIFICATION_CODE_SUCCESS')
    return jsonify(response), status_code
