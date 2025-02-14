from flask import request, current_app
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import create_access_token

from models.verification_code import VerificationCode
from models.user import User
from extensions import db
from ..utils.util import (
    validate_email_format, 
    generate_verification_code, 
    send_verification_email,
)

verify_ns = Namespace('verify', description='验证码相关操作', path='/api/verify')

# 请求模型
verify_code_request_model = verify_ns.model('VerifyCode', {
    'email': fields.String(required=True, description='邮箱地址'),
    'code': fields.String(description='验证码'),
    'username': fields.String(description='用户名')
})
send_code_request_model = verify_ns.model('SendCodeRequest', {
    'email': fields.String(required=True, description='邮箱地址'),
})
# 响应模型
token_model = verify_ns.model('Token', {
    'access_token': fields.String(description='访问令牌'),
})

@verify_ns.route('/send_code')
class SendVerificationCode(Resource):
    @verify_ns.doc(description='发送验证码')
    @verify_ns.expect(send_code_request_model)
    @verify_ns.response(201, 'Verification code sent successfully')
    @verify_ns.response(400, 'Invalid request format')
    @verify_ns.response(500, 'Internal server error')
    def post(self):
        data = verify_ns.payload
        email = data.get('email')

        validated_email = validate_email_format(email)
        if not validated_email:
            verify_ns.abort(400, 'Invalid email address format')
        
        email = validated_email

        verification_code = generate_verification_code()
        
        try:
            # 保存验证码
            code_obj = VerificationCode(
                email=email,
                code=verification_code,
            )
            current_app.logger.debug(f"Verification code: {verification_code}")
            db.session.add(code_obj)
            db.session.commit()

            # 发送验证码邮件
            if not send_verification_email(email, verification_code):
                db.session.rollback()
                verify_ns.abort(500, 'Failed to send verification email')

            return {}, 201

        except Exception as e:
            db.session.rollback()
            verify_ns.abort(500, 'Internal server error')

@verify_ns.route('/verify_and_login')
class VerifyAndLogin(Resource):
    @verify_ns.doc(description='验证并登录')
    @verify_ns.expect(verify_code_request_model)
    @verify_ns.response(200, 'Login successful', token_model)
    @verify_ns.response(400, 'Missing parameters: email and code are required')
    @verify_ns.response(401, 'Invalid verification code')
    @verify_ns.response(404, 'User not found')
    @verify_ns.response(500, 'Internal server error')
    @verify_ns.marshal_with(token_model)
    def post(self):
        data = verify_ns.payload
        email = data.get('email')
        code = data.get('code')
        username = data.get('username')

        if not email or not code:
            verify_ns.abort(400, 'Missing parameters: email and code are required')
        
        verification = VerificationCode.verify_and_invalidate(email, code)
        if not verification:
            verify_ns.abort(401, 'Invalid verification code')
        
        try:
            # 验证成功后激活用户并登录
            user = User.query.filter_by(email=verification.email).first()
            if not user:
                # 如果用户不存在，创建新用户
                user = User(
                    email=verification.email,
                    username=username or verification.email.split('@')[0],
                    is_active=True
                )
                db.session.add(user)
            # 激活用户
            user.is_active = True
            db.session.delete(verification)
            db.session.commit()
            
            # 创建访问令牌
            access_token = create_access_token(identity=user.id)
            model = {
                'access_token': access_token,
            }
            return model, 200

        except Exception as e:
            db.session.rollback()
            verify_ns.abort(500, 'Internal server error')
