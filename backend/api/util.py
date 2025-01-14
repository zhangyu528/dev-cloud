from email_validator import validate_email, EmailNotValidError
import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def validate_email_format(email, strict=True):
    """Validate email format with optional strict validation
    
    Args:
        email (str): Email address to validate
        strict (bool): If True, use email-validator for strict validation.
                      If False, use simple format validation.
    
    Returns:
        str: Normalized email if valid, None if invalid
    """
    if strict:
        try:
            # Try using email-validator if available
            valid = validate_email(email)
            return valid.email  # Return normalized email
        except ImportError:
            # Fallback to simple validation if email-validator not installed
            pass
        except EmailNotValidError:
            return None
    
    # Simple format validation
    if not email:
        return None
        
    # Basic format check
    parts = email.split('@')
    if len(parts) != 2:
        return None
        
    local_part, domain = parts
    
    # Validate local part
    if not local_part or len(local_part) > 64:
        return None
        
    # Validate domain
    if not domain or len(domain) > 255:
        return None
        
    # Domain must have at least one dot
    if '.' not in domain:
        return None
        
    # Domain parts validation
    domain_parts = domain.split('.')
    if any(not part or len(part) > 63 for part in domain_parts):
        return None
        
    # Basic special characters check
    if any(char in local_part for char in ' ()<>[]:;@\\,') or \
       any(char in domain for char in ' ()<>[]:;@\\,'):
        return None
        
    return email



def generate_verification_code():
    """Generate a 6-digit verification code"""
    return str(random.randint(100000, 999999))

def send_verification_email(to_email, code):
    """Send verification code via email"""
    SMTP_SERVER = "smtp.ethereal.email"
    SMTP_PORT = 587
    SMTP_USERNAME = "enoch20@ethereal.email"
    SMTP_PASSWORD = "kvaEbf4214Q7pMCtNb"
    if not all([SMTP_SERVER, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD]):
        print("SMTP configuration is incomplete")
        return False
        
    message = MIMEMultipart()
    message["From"] = "no-reply@example.com"  # Use a generic sender
    message["To"] = to_email
    message["Subject"] = "Email Verification Code"
    
    body = f"""
    Your verification code is: {code}
    
    This code will expire in 10 minutes.
    If you didn't request this code, please ignore this email.
    """
    
    message.attach(MIMEText(body, "plain"))
    
    try:
        print(f"Connecting to SMTP server: {SMTP_SERVER}:{SMTP_PORT}")
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT, timeout=10) as server:
            print("Starting TLS...")
            server.starttls()
            print(f"Logging in with username: {SMTP_USERNAME}")
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            print(f"Sending email to: {to_email}")
            server.sendmail(SMTP_USERNAME, to_email, message.as_string())
            print("Email sent successfully")
            return True
    except smtplib.SMTPAuthenticationError as e:
        print(f"SMTP Authentication Error: {e}")
        print(f"Check if username/password are correct. Username: {SMTP_USERNAME}")
    except smtplib.SMTPConnectError as e:
        print(f"SMTP Connection Error: {e}")
        print(f"Check if SMTP server and port are correct: {SMTP_SERVER}:{SMTP_PORT}")
    except smtplib.SMTPException as e:
        print(f"SMTP Error: {e}")
    except Exception as e:
        print(f"Unexpected Error: {e}")
    
    return False
