from flask import request, jsonify
import os
import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

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
    
    # Store verification code in cache/database with expiration time
    # TODO: Implement proper storage of verification code
    
    if send_verification_email(email, verification_code):
        response, status_code = get_status_response('EMAIL', 'VERIFICATION_CODE_SENT')
        return jsonify(response), status_code
    else:
        response, status_code = get_status_response('EMAIL', 'EMAIL_SENDING_FAILED')
        return jsonify(response), status_code
