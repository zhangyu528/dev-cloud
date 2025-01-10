import os

class ProdSecurityConfig:
    SECRET_KEY = os.getenv('SECRET_KEY')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES', 3600))
    SECURITY_PASSWORD_SALT = os.getenv('SECURITY_PASSWORD_SALT')
    SECURITY_PASSWORD_HASH = 'bcrypt'
    SECURITY_PASSWORD_COMPLEXITY = {
        'UPPER': 1,
        'LOWER': 1,
        'DIGITS': 1,
        'SPECIAL': 1
    }
