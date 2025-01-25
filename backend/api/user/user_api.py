from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User
from ..status_codes import get_server_error_response


user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    try:
        # Get user identity from JWT
        current_user_id = get_jwt_identity()
        if not current_user_id:
            return jsonify({}), 400, {'X-Message': 'Invalid token'}

        # Query user from database
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({}), 400, {'X-Message': 'User not found'}
        #
        # Return user information
        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'is_active': user.is_active,
            'created_at': user.created_at.isoformat(),
            'github_profile': user.github_profile,
            'avatar_url': user.avatar_url
        }
        return jsonify(user_data), 200
    except Exception as e:
        return get_server_error_response()


@user_bp.route('/verify-token', methods=['POST'])
@jwt_required()
def verify_token():
    try:
        # Verify JWT token is valid
        current_user = get_jwt_identity()
        if not current_user:
            return jsonify({}), 400, {'X-Message': 'Invalid token'}

        # Return verification result
        return jsonify({}), 200
    except Exception as e:
        return get_server_error_response()


@user_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    try:
        # Verify JWT token is valid
        current_user = get_jwt_identity()
        if not current_user:
            return jsonify({}), 400, {'X-Message': 'Invalid token'}
        
        return jsonify({}), 200
    except Exception as e:
        return get_server_error_response()
