from typing import Tuple, Dict, Any
from flask import jsonify

def get_server_error_response() -> Tuple[Dict[str, Any], int, Dict[str, str]]:
    """
    Returns a standardized 500 server error response
    
    Returns:
        Tuple containing:
        - http_status_code: 500
        - headers: Dictionary with X-Message header
    """
    message = 'Internal server error, please try again later'
    return jsonify({}), 500, {
        'X-Message': message
    }
