import pytest
from unittest.mock import patch
from backend.db.models import User
from backend.api.status_codes import StatusCodes

class TestVerificationCode:
    @pytest.fixture(autouse=True, scope='class')
    def setup_database(self):
        from backend.extensions import db
        db.create_all()
        yield
        db.session.remove()
        db.drop_all()

    @pytest.fixture(autouse=True, scope='function')
    def cleanup_test_data(self):
        yield
        from backend.extensions import db
        User.query.delete()
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
