from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User

from ..status_codes import (
    StatusCodes,
    StatusCodeCategory,
    StatusCodeKey)

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    # Get user identity from JWT
    current_user_id = get_jwt_identity()
    if not current_user_id:
        response, status_code = StatusCodes.get_status_response(
            StatusCodeCategory.USER,
            StatusCodeKey.USER_Token_INVALID
        )
        return jsonify(response), status_code

    # Query user from database
    user = User.query.get(current_user_id)
    if not user:
        response, status_code = StatusCodes.get_status_response(
            StatusCodeCategory.USER,
            StatusCodeKey.USER_NOT_FOUND
        )
        return jsonify(response), status_code

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

    response, status_code = StatusCodes.get_status_response(
        StatusCodeCategory.USER,
        StatusCodeKey.USER_INFO_SUCCESS
    )
    response['data'] = user_data
    return jsonify(response), status_code


@user_bp.route('/verify-token', methods=['POST'])
@jwt_required()
def verify_token():
    # Verify JWT token is valid
    current_user = get_jwt_identity()
    if not current_user:
        return jsonify({
            'valid': False
        }), 401

    # Return verification result
    return jsonify({
        'valid': True
    }), 200


@user_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # Verify JWT token is valid
    current_user = get_jwt_identity()
    if not current_user:
        response, status_code = StatusCodes.get_status_response(
            StatusCodeCategory.USER, 
            StatusCodeKey.USER_Token_INVALID
        )
        return jsonify(response), status_code

        
    # Return success response using status codes system
    response, status_code = StatusCodes.get_status_response(
        StatusCodeCategory.USER, 
        StatusCodeKey.USER_LOGOUT_SUCCESS
    )
    return jsonify(response), status_code
