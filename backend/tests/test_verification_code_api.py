import pytest
from unittest.mock import patch
from datetime import datetime, timedelta, timezone

from backend.extensions import db
from backend.api.status_codes import StatusCodes
from backend.db.models.verification_code import VerificationCode

class TestVerificationCode:
    @pytest.fixture(autouse=True, scope='class')
    def setup_database(self):
        db.create_all()
        yield
        db.session.remove()
        db.drop_all()

    @pytest.fixture(autouse=True, scope='function')
    def cleanup_test_data(self):
        yield
        VerificationCode.query.delete()
        db.session.commit()
    
    # 使用 mock 对象替换 send_verification_email 函数
    @patch('backend.api.verification_code_api.send_verification_email')
    # 测试发送验证码成功
    def test_send_verification_code_success(self, mock_send_email, client):
        """Test successful verification code sending"""
        mock_send_email.return_value = True
        
        response = client.post('/api/send-verification-code', 
                             json={'email': 'test@example.com'})
        
        assert response.status_code == StatusCodes.EMAIL['VERIFICATION_CODE_SENT']['status_code']
        mock_send_email.assert_called_once()

    @patch('backend.api.verification_code_api.send_verification_email')
    # 测试 SMTP 发送失败
    def test_send_verification_code_smtp_failure(self, mock_send_email, client):
        """Test SMTP failure handling"""
        mock_send_email.return_value = False
        
        response = client.post('/api/send-verification-code', 
                             json={'email': 'test@example.com'})
        
        assert response.status_code == StatusCodes.EMAIL['EMAIL_SENDING_FAILED']['status_code']
    # 测试无效邮箱
    def test_send_verification_code_invalid_email(self, client):
        """Test invalid email input"""
        response = client.post('/api/send-verification-code', 
                             json={'email': ''})
        
        assert response.status_code == StatusCodes.EMAIL['INVALID_EMAIL']['status_code']
    # 测试缺少邮箱字段
    def test_send_verification_code_missing_email(self, client):
        """Test missing email field"""
        response = client.post('/api/send-verification-code', 
                             json={})
        
        assert response.status_code == StatusCodes.EMAIL['INVALID_EMAIL']['status_code']

    @patch('backend.api.verification_code_api.send_verification_email')
    # 测试验证码格式
    def test_verification_code_format(self, mock_send_email, client):
        """Test verification code format"""
        def verify_code(to_email, code):
            assert len(code) == 6
            assert code.isdigit()
            return True

        mock_send_email.side_effect = verify_code
        
        response = client.post('/api/send-verification-code', 
                             json={'email': 'test@example.com'})
        
        assert response.status_code == StatusCodes.EMAIL['VERIFICATION_CODE_SENT']['status_code']
        assert mock_send_email.called

    def test_verify_code_success(self, client):
        """Test successful code verification"""
        # 创建测试验证码
        test_code = "123456"
        test_email = "test@example.com"
        verification = VerificationCode(
            email=test_email,
            code=test_code,
            created_at=datetime.now(timezone.utc)
        )
        db.session.add(verification)
        db.session.commit()
        
        response = client.post('/api/verify-code', 
                             json={'email': test_email, 'code': test_code})
        
        assert response.status_code == StatusCodes.EMAIL['VERIFICATION_CODE_SUCCESS']['status_code']
        
        # 验证验证码已被删除
        assert VerificationCode.query.filter_by(email=test_email).first() is None

    def test_verify_code_expired(self, client):
        """Test expired verification code"""
        test_code = "123456"
        test_email = "test@example.com"
        verification = VerificationCode(
            email=test_email,
            code=test_code,
            created_at=datetime.now(timezone.utc) - timedelta(minutes=11)  # 11分钟前创建
        )
        db.session.add(verification)
        db.session.commit()
        
        response = client.post('/api/verify-code', 
                             json={'email': test_email, 'code': test_code})
        
        assert response.status_code == StatusCodes.EMAIL['VERIFICATION_CODE_EXPIRED']['status_code']

    def test_verify_code_invalid(self, client):
        """Test invalid verification code"""
        test_code = "123456"
        test_email = "test@example.com"
        verification = VerificationCode(
            email=test_email,
            code=test_code,
            created_at=datetime.now(timezone.utc)
        )
        db.session.add(verification)
        db.session.commit()
        
        response = client.post('/api/verify-code', 
                             json={'email': test_email, 'code': "wrong_code"})
        
        assert response.status_code == StatusCodes.EMAIL['INVALID_VERIFICATION_CODE']['status_code']

    def test_verify_code_missing_email(self, client):
        """Test verification with missing email"""
        response = client.post('/api/verify-code', 
                             json={'code': '123456'})
        
        assert response.status_code == 400

    def test_verify_code_missing_code(self, client):
        """Test verification with missing code"""
        response = client.post('/api/verify-code', 
                             json={'email': 'test@example.com'})
        
        assert response.status_code == 400

    def test_verify_code_missing_both(self, client):
        """Test verification with missing both email and code"""
        response = client.post('/api/verify-code', 
                             json={})
        
        assert response.status_code == 400

    def test_verify_code_empty_values(self, client):
        """Test verification with empty email and code"""
        response = client.post('/api/verify-code', 
                             json={'email': '', 'code': ''})
        
        assert response.status_code == 400
