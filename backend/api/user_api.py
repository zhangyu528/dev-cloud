from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from . import api_bp
from .status_codes import get_status_response


@api_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # In JWT, logout is typically handled client-side by removing the token
    response, status_code = get_status_response('USER', 'USER_LOGOUT_SUCCESS')
    return jsonify(response), status_code