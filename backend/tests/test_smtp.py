import pytest
import smtplib
from email.mime.text import MIMEText

SMTP_SERVER = "smtp.ethereal.email"
SMTP_PORT = 587
SMTP_USERNAME = "jennyfer9@ethereal.email"
SMTP_PASSWORD = "aqpGF4YMHKa54u5mtc"

@pytest.mark.smtp
def test_smtp_connection():
    """Test SMTP connection using Ethereal.email credentials"""
    try:
        # Create message
        msg = MIMEText("This is a test email from Ethereal")
        msg['Subject'] = 'SMTP Test'
        msg['From'] = 'jennyfer9@ethereal.email'
        msg['To'] = 'jennyfer9@ethereal.email'

        # Connect to server
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.sendmail('jennyfer9@ethereal.email', ['jennyfer9@ethereal.email'], msg.as_string())
        
        assert True, "SMTP connection successful"
    except Exception as e:
        pytest.fail(f"SMTP connection failed: {str(e)}")
