from flask import Blueprint, redirect, request, jsonify
from flask_jwt_extended import create_access_token
from requests_oauthlib import OAuth2Session
from urllib.parse import urlencode
from models.user import User
from extensions import db
from config.dev.security import DevSecurityConfig as SecurityConfig

github_auth_bp = Blueprint('github_auth', __name__)

# GitHub OAuth configuration
github = OAuth2Session(
    client_id=SecurityConfig.GITHUB_CLIENT_ID,
    redirect_uri='http://localhost:5000/auth/github/callback',
    scope=['user:email']
)

@github_auth_bp.route('/auth/github')
def github_login():
    """Initiate GitHub OAuth flow"""
    authorization_url, state = github.authorization_url(
        SecurityConfig.GITHUB_AUTHORIZE_URL
    )
    return redirect(authorization_url)

@github_auth_bp.route('/auth/github/callback')
def github_callback():
    """Handle GitHub OAuth callback"""
    try:
        # Get access token
        token = github.fetch_token(
            SecurityConfig.GITHUB_TOKEN_URL,
            client_secret=SecurityConfig.GITHUB_CLIENT_SECRET,
            authorization_response=request.url
        )
        
        # Get user info
        github_user = github.get(SecurityConfig.GITHUB_USER_INFO_URL).json()
        
        # Find or create user
        user = User.query.filter_by(github_id=str(github_user['id'])).first()
        if not user:
            user = User(
                username=github_user['login'],
                email=github_user.get('email', ''),
                github_id=str(github_user['id']),
                github_access_token=token['access_token'],
                github_profile=github_user,
                is_active=True
            )
            db.session.add(user)
            db.session.commit()
        
        # Create JWT token
        access_token = create_access_token(identity=user.id)
        
        # Redirect to frontend with token
        params = urlencode({'token': access_token})
        return redirect(f'http://localhost:3000/login?{params}')
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
