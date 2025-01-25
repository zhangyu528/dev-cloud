from flask import Blueprint, redirect, request, jsonify
from flask_jwt_extended import create_access_token
from requests_oauthlib import OAuth2Session
from urllib.parse import urlencode
from models.user import User
from extensions import db
from flask import current_app
from ..status_codes import get_server_error_response

github_auth_bp = Blueprint('github_auth_bp', __name__)

@github_auth_bp.route('/github')
def github_login():
    """Initiate GitHub OAuth flow"""
    try:
        github = OAuth2Session(
            client_id=current_app.config['GITHUB_CLIENT_ID'],
            redirect_uri=current_app.config['GITHUB_REDIRECT_URI'],
            scope=['user:email'],
            state=request.args['state']
        )
        
        authorization_url, state = github.authorization_url(
            current_app.config['GITHUB_AUTHORIZE_URL'],
        )
        return redirect(authorization_url)
    except Exception as e:
        current_app.logger.error(f"GitHub login error: {str(e)}", exc_info=True)
        return get_server_error_response()

@github_auth_bp.route('/github/exchange')
def github_exchange():
    """Exchange GitHub OAuth code for access token"""
    try:
        # Verify state parameter
        if 'state' not in request.args:
            return jsonify({}), 400, {'X-Message': 'Missing state parameter'}
                        
        github = OAuth2Session(
            client_id=current_app.config['GITHUB_CLIENT_ID'],
            redirect_uri=current_app.config['GITHUB_REDIRECT_URI'],
            scope=['user:email'],
            state=request.args['state']
        )
        
        # Get access token
        token = github.fetch_token(
            current_app.config['GITHUB_TOKEN_URL'],
            client_secret=current_app.config['GITHUB_CLIENT_SECRET'],
            code=request.args['code'])
        
        # Get user info
        github_user = github.get(current_app.config['GITHUB_USER_INFO_URL']).json()
        # Find or create user
        try:
            # Try to find user by github_id first
            user = User.query.filter(User.github_id == str(github_user['id'])).first()
            
            # If not found by github_id, try to find by email
            if not user:
                # Get primary email if public email is not available
                email = github_user.get('email')
                if not email:
                    try:
                        emails = github.get('https://api.github.com/user/emails').json()
                        current_app.logger.debug(f"GitHub user emails: {emails}")
                        primary_email = next((e['email'] for e in emails if e['primary'] and e['verified']), None)
                        email = primary_email or f"{github_user['login']}@users.noreply.github.com"
                    except Exception as e:
                        current_app.logger.error(f"Failed to get GitHub emails: {str(e)}")
                        email = f"{github_user['login']}@users.noreply.github.com"
                
                # Find existing user by email
                user = User.query.filter(User.email == email).first()
                
                if user:
                    # Update existing user with GitHub info
                    user.github_id = str(github_user['id'])
                    user.github_access_token = token['access_token']
                    user.github_profile = github_user
                    user.avatar_url = github_user['avatar_url']
                else:
                    # Create new user
                    user = User(
                        username=github_user['login'],
                        email=email,
                        github_id=str(github_user['id']),
                        github_access_token=token['access_token'],
                        github_profile=github_user,
                        avatar_url=github_user['avatar_url'],
                        is_active=True
                    )
                    db.session.add(user)
            
            # Update avatar URL for existing users
            user.avatar_url = github_user['avatar_url']
            db.session.commit()
        except Exception as e:
            current_app.logger.error(f"Database query error: {str(e)}", exc_info=True)
            return get_server_error_response()
        
        # Create JWT token
        access_token = create_access_token(identity=user.id)
        
        # Return token in JSON response
        return jsonify({
            'token': access_token,
            'username': user.username
        }), 200
    
    except Exception as e:
        current_app.logger.error(f"GitHub OAuth callback error: {str(e)}", exc_info=True)
        return get_server_error_response()
