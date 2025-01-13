import pytest
import os
from unittest.mock import patch
from api.util import send_verification_email

class TestUtil:
    def test_send_verification_email_real(self):
        """Test email sending with real SMTP server"""
        TEST_SMTP_SERVER = "smtp.ethereal.email"
        TEST_SMTP_PORT = 587
        TEST_SMTP_USER = "jennyfer9@ethereal.email"
        TEST_SMTP_PASSWORD = "aqpGF4YMHKa54u5mtc"
        TEST_EMAIL = "zhangyu528@163.com"
        # Get test SMTP configuration from environment
        smtp_server = os.getenv('TEST_SMTP_SERVER', TEST_SMTP_SERVER)
        smtp_port = int(os.getenv('TEST_SMTP_PORT', TEST_SMTP_PORT))
        smtp_user = os.getenv('TEST_SMTP_USER', TEST_SMTP_USER)
        smtp_password = os.getenv('TEST_SMTP_PASSWORD', TEST_SMTP_PASSWORD)
        test_email = os.getenv('TEST_EMAIL', TEST_EMAIL)

        # Skip if required configuration is missing
        if not all([smtp_server, smtp_user, smtp_password, test_email]):
            pytest.skip("Missing required SMTP test configuration")

        # Test email sending
        result = send_verification_email(test_email, '123456')
        assert result is True
