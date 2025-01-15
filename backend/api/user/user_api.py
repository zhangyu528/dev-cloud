from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from ..status_codes import (
    StatusCodes,
    StatusCodeCategory,
    StatusCodeKey)

user_bp = Blueprint('user_bp', __name__)

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
