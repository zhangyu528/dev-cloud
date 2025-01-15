import pytest
import os
from backend.api.utils.util import send_verification_email

class TestUtil:
    def test_send_verification_email_real(self):
        """Test email sending with real SMTP server"""
     
        # Get test SMTP configuration from environment
        test_email = "enoch20@ethereal.email"

        # Test email sending
        result = send_verification_email(test_email, '123456')
        assert result is True
