from flask import Blueprint, redirect, request, jsonify
from flask_jwt_extended import create_access_token
from requests_oauthlib import OAuth2Session
from urllib.parse import urlencode
from models.user import User
from extensions import db
from flask import current_app

github_auth_bp = Blueprint('github_auth_bp', __name__)

@github_auth_bp.route('/github')
def github_login():
    """Initiate GitHub OAuth flow"""
    try:
        github = OAuth2Session(
            client_id=current_app.config['GITHUB_CLIENT_ID'],
            redirect_uri=current_app.config['GITHUB_REDIRECT_URI'],
            scope=['user:email']
        )
        
        authorization_url, state = github.authorization_url(
            current_app.config['GITHUB_AUTHORIZE_URL'],
        )
        return redirect(authorization_url)
    except Exception as e:
        current_app.logger.error(f"GitHub login error: {str(e)}", exc_info=True)
        return jsonify({'error': 'Failed to initiate GitHub login'}), 500

@github_auth_bp.route('/github/callback')
def github_callback():
    """Handle GitHub OAuth callback"""
    try:
        # Verify state parameter
        if 'state' not in request.args:
            return jsonify({'error': 'Missing state parameter'}), 400
            
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
            authorization_response=request.url)
        
        # Get user info
        github_user = github.get(current_app.config['GITHUB_USER_INFO_URL']).json()
        current_app.logger.debug(f"Successfully fetched GitHub user info: {github_user}")
        # Find or create user
        try:
            user = User.query.filter(User.github_id == str(github_user['id'])).first()
            if not user:
                # Get primary email if public email is not available
                email = github_user.get('email')
                if not email:
                    emails = github.get('https://api.github.com/user/emails').json()
                    current_app.logger.debug(f"GitHub user emails: {emails}")
                    primary_email = next((e['email'] for e in emails if e['primary']), None)
                    email = primary_email or f"{github_user['login']}@users.noreply.github.com"

                user = User(
                    username=github_user['login'],
                    email=email,
                    github_id=str(github_user['id']),
                    github_access_token=token['access_token'],
                    github_profile=github_user,
                    is_active=True
                )
                db.session.add(user)
                db.session.commit()
        except Exception as e:
            current_app.logger.error(f"Database query error: {str(e)}", exc_info=True)
            return jsonify({'error': 'Failed to query database'}), 500
        
        # Create JWT token
        access_token = create_access_token(identity=user.id)
        
        # Redirect to frontend with token
        params = urlencode({'token': access_token})
        return redirect(f'http://localhost:3000/')
    
    except Exception as e:
        current_app.logger.error(f"GitHub OAuth callback error: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 500
