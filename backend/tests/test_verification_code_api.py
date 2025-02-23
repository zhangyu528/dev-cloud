import pytest
from unittest.mock import patch
from datetime import datetime, timedelta, timezone
from flask import url_for

from extensions import db
from api.status_codes import StatusCodes
from models.user import User
from models.verification_code import VerificationCode

class TestVerificationCodeApi:
    @pytest.fixture(autouse=True, scope='class')
    def setup_database(self):
        db.create_all()
        yield
        db.session.remove()
        db.drop_all()

    @pytest.fixture(autouse=True)
    def cleanup_test_data(self):
        yield
        User.query.delete()
        VerificationCode.query.delete()
        db.session.commit()

    # 测试验证码发送相关用例
    @patch('api.user.verify_and_login_code_api.send_verification_email')
    def test_send_code_success(self, mock_send_email, client):
        """测试发送验证码成功"""
        mock_send_email.return_value = True
        with client.application.app_context():
            response = client.post(url_for('verify_bp.send_verification_code'), 
                                 json={'email': 'test@163.com'})
            assert response.status_code == 200

    @patch('api.user.verify_and_login_code_api.send_verification_email')
    def test_send_code_invalid_email(self, mock_send_email, client):
        """测试无效邮箱地址"""
        mock_send_email.return_value = True
        with client.application.app_context():
            response = client.post(url_for('verify_bp.send_verification_code'), 
                                 json={'email': 'invalid-email'})
            assert response.status_code == 400

    @patch('api.user.verify_and_login_code_api.send_verification_email')
    def test_send_code_email_failed(self, mock_send_email, client):
        """测试邮件发送失败"""
        mock_send_email.return_value = False
        with client.application.app_context():
            response = client.post(url_for('verify_bp.send_verification_code'), 
                                 json={'email': 'test@example.com'})
            assert response.status_code == 400

    # 测试验证码验证登录相关用例
    def test_verify_and_login_user_not_found(self, client):
        """测试用户不存在"""
        email = 'nonexistent@example.com'
        code = '123456'
        
        with client.application.app_context():
            response = client.post(url_for('verify_bp.verify_and_login'), 
                                 json={'email': email, 'code': code})
            assert response.status_code == 400

    def test_verify_and_login_success(self, client):
        """测试验证码验证登录成功"""
        email = 'test@example.com'
        code = '123456'
        
        # 创建验证码记录
        verification = VerificationCode(email=email, code=code)
        db.session.add(verification)
        
        # 创建未激活用户
        user = User(email=email, username=email.split('@')[0])
        db.session.add(user)
        db.session.commit()

        with client.application.app_context():
            response = client.post(url_for('verify_bp.verify_and_login'), 
                                 json={'email': email, 'code': code})
            assert response.status_code == 200
            assert 'access_token' in response.json

            # 验证用户已激活
            updated_user = User.query.filter_by(email=email).first()
            assert updated_user.is_active is True
            
            # 验证验证码已被删除
            assert VerificationCode.query.filter_by(email=email).first() is None

    def test_verify_and_login_invalid_code(self, client):
        """测试无效验证码"""
        email = 'test@example.com'
        # 创建用户和验证码
        user = User(email=email, username=email.split('@')[0])
        verification = VerificationCode(email=email, code='123456')
        db.session.add(user)
        db.session.add(verification)
        db.session.commit()

        with client.application.app_context():
            response = client.post(url_for('verify_bp.verify_and_login'), 
                                 json={'email': email, 'code': '000000'})
            assert response.status_code == 400
            # 验证验证码未被删除
            assert VerificationCode.query.filter_by(email=email).first() is not None

    def test_verify_and_login_expired_code(self, client):
        """测试过期验证码"""
        email = 'test@example.com'
        code = '123456'
        
        # 创建过期验证码
        verification = VerificationCode(email=email, code=code)
        verification.expires_at = datetime.now(timezone.utc) - timedelta(minutes=1)
        db.session.add(verification)
        db.session.commit()

        with client.application.app_context():
            response = client.post(url_for('verify_bp.verify_and_login'), 
                                 json={'email': email, 'code': code})
            assert response.status_code == 400
            # 验证过期验证码未被删除
            assert VerificationCode.query.filter_by(email=email).first() is not None
