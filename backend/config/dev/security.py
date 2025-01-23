import os

class DevSecurityConfig:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'dev-jwt-secret-key')
    JWT_ACCESS_TOKEN_EXPIRES = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES', 3600*24*30))
    SECURITY_PASSWORD_SALT = os.getenv('SECURITY_PASSWORD_SALT', 'dev-password-salt')
    SECURITY_PASSWORD_HASH = 'bcrypt'
    SECURITY_PASSWORD_COMPLEXITY = {
        'UPPER': 1,
        'LOWER': 1,
        'DIGITS': 1,
        'SPECIAL': 1
    }
    
    # Allow OAuth over HTTP in development
    OAUTHLIB_INSECURE_TRANSPORT = "1"
    
    # GitHub OAuth Configuration
    GITHUB_CLIENT_ID = os.getenv('GITHUB_CLIENT_ID', 'Ov23liWR7gUQMFG6xTvf')
    GITHUB_CLIENT_SECRET = os.getenv('GITHUB_CLIENT_SECRET', '3248fa59a32727ca4e4ef3447d5fe4123aaf4567')
    GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize'
    GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token'
    GITHUB_USER_INFO_URL = 'https://api.github.com/user'
    GITHUB_REDIRECT_URI = 'http://localhost:3000/login/github/callback'
