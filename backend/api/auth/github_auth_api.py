from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import create_access_token
from requests_oauthlib import OAuth2Session
from models.user import User
from extensions import db
from flask import current_app, redirect, request

# 初始化认证命名空间
github_ns = Namespace('auth', description='用户认证操作', path='/auth/github')

# 请求模型
callback_request_model = github_ns.model('CallbackRequest', {
    'code': fields.String(required=True, description='GitHub返回的授权码'),
    'state': fields.String(required=True, description='防止CSRF攻击的状态码')
})

# 响应模型
token_model = github_ns.model('AuthToken', {
    'access_token': fields.String(required=True, description='JWT访问令牌'),
})

@github_ns.route('/login')
class GitHubLogin(Resource):
    @github_ns.doc(description='GitHub OAuth登录入口')
    @github_ns.response(302, '重定向到GitHub授权页面')
    @github_ns.response(500, '服务器内部错误')
    def get(self):
        """初始化GitHub OAuth流程"""
        github = OAuth2Session(
            client_id=current_app.config['GITHUB_CLIENT_ID'],
            redirect_uri=current_app.config['GITHUB_REDIRECT_URI'],
            scope=['user:email'],
            state=request.args['state']
        )
        authorization_url, _ = github.authorization_url(
            current_app.config['GITHUB_AUTHORIZE_URL'],
        )
        return redirect(authorization_url), 302

@github_ns.route('/callback')
class GitHubCallback(Resource):
    @github_ns.doc(
        security={'OAuth2': ['user:email']},
        description='GitHub OAuth回调接口',
    )
    @github_ns.expect(callback_request_model)
    @github_ns.marshal_with(token_model, code=200)
    @github_ns.response(200, '成功', token_model)
    @github_ns.response(400, '缺少state参数')
    @github_ns.response(401, '无效的授权码')
    @github_ns.response(500, '服务器内部错误')
    def get(self):
        # Verify required parameters
        if 'state' not in request.args:
            github_ns.abort(400, '缺少state参数')
        if 'code' not in request.args:
            github_ns.abort(400, '缺少code参数')
            
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
            github_ns.abort(500, '服务器内部错误')
        
        # Create JWT token
        access_token = create_access_token(identity=user.id)
        token_model = {
                'access_token': access_token,
        }
        # Return token in JSON response
        return token_model, 200
