from flask import request, jsonify
from flask import Blueprint
from ..utils.util import validate_email_format, generate_verification_code, send_verification_email
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token
from flask import current_app

from models.verification_code import VerificationCode
from models.user import User
from extensions import db

from ..status_codes import StatusCodes, StatusCodeCategory, StatusCodeKey

from .user_api import user_bp

@user_bp.route('/send_verification_code', methods=['POST'])
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
    
    # Validate email format using utility function
    print(f"Validating email: {email}")
    validated_email = validate_email_format(email)
    if not validated_email:
        print("Email validation failed")
        response, status_code = StatusCodes.get_status_response(StatusCodeCategory.EMAIL, StatusCodeKey.INVALID_EMAIL)
        return jsonify(response), status_code
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
            response, status_code = StatusCodes.get_status_response(StatusCodeCategory.EMAIL, StatusCodeKey.VERIFICATION_CODE_SENT)
            return jsonify(response), status_code
        
        db.session.rollback()
        response, status_code = StatusCodes.get_status_response(StatusCodeCategory.EMAIL, StatusCodeKey.EMAIL_SENDING_FAILED)
        return jsonify(response), status_code
        
    except Exception as e:
        db.session.rollback()
        response = StatusCodes.get_status_response(StatusCodeCategory.EMAIL, StatusCodeKey.EMAIL_SENDING_FAILED)
        return jsonify(response), 500

@user_bp.route('/verify_and_login', methods=['POST'])
def verify_and_login():
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
            username:
              type: string
              description: 用户名
              example: "johndoe"
    responses:
      200:
        description: 验证成功并登录
        schema:
          type: object
          properties:
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
    print(email, code)
    if not email or not code:
        response, status_code = StatusCodes.get_status_response(StatusCodeCategory.EMAIL, StatusCodeKey.INVALID_EMAIL)
        return jsonify(response), status_code
    
    # 使用重命名后的方法
    verification = VerificationCode.verify_and_invalidate(email, code)
    
    if not verification:
        response, status_code = StatusCodes.get_status_response(StatusCodeCategory.EMAIL, StatusCodeKey.INVALID_VERIFICATION_CODE)
        return jsonify(response), status_code, 
    
    try:
        # 验证成功后激活用户并登录
        user = User.query.filter_by(email=verification.email).first()
        if user:
            user.is_active = True
            db.session.delete(verification)
            db.session.commit()
            
            # 创建访问令牌
            access_token = create_access_token(identity=user.id)
            
            response, status_code = StatusCodes.get_status_response(StatusCodeCategory.EMAIL, StatusCodeKey.VERIFICATION_CODE_SUCCESS)
            response_data = {
                'message': response['message'],
                'access_token': access_token,
                'username': user.username
            }
            return jsonify(response_data), status_code
        else:
            response, status_code = StatusCodes.get_status_response(StatusCodeCategory.EMAIL, StatusCodeKey.INVALID_VERIFICATION_CODE)
            return jsonify(response), status_code
    except Exception as e:
        db.session.rollback()
        response, status_code = StatusCodes.get_status_response('EMAIL', 'EMAIL_SENDING_FAILED')
        return jsonify(response), status_code

    response, status_code = StatusCodes.get_status_response(StatusCodeCategory.EMAIL, StatusCodeKey.VERIFICATION_CODE_SUCCESS)
    return jsonify(response), status_code
