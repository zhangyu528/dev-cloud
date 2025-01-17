from enum import Enum
from typing import Literal, TypedDict, Tuple, Dict, Any

class StatusCodeCategory(str, Enum):
    USER = "USER"
    EMAIL = "EMAIL"

class StatusCodeKey(str, Enum):
    USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS"
    USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS"
    USER_Token_INVALID = "USER_Token_INVALID"
    USER_NOT_FOUND = "USER_NOT_FOUND"
    USER_INFO_SUCCESS = "USER_INFO_SUCCESS"

    INVALID_EMAIL = "INVALID_EMAIL"
    VERIFICATION_CODE_SENT = "VERIFICATION_CODE_SENT"
    EMAIL_SENDING_FAILED = "EMAIL_SENDING_FAILED"
    VERIFICATION_CODE_EXPIRED = "VERIFICATION_CODE_EXPIRED"
    INVALID_VERIFICATION_CODE = "INVALID_VERIFICATION_CODE"
    VERIFICATION_CODE_SUCCESS = "VERIFICATION_CODE_SUCCESS"

    SMTP_CONFIG_MISSING = "SMTP_CONFIG_MISSING"

class StatusCodeDetails(TypedDict):
    message: str
    status_code: int

class StatusCodes:
    """
    Centralized status codes for the application.
    Each status code contains:
    - message: Human-readable description
    - status_code: HTTP status code
    """
    
    USER: Dict[StatusCodeKey, StatusCodeDetails] = {
        StatusCodeKey.USER_LOGIN_SUCCESS : {
            'message': 'User logged in successfully',
            'status_code': 200
        },
        StatusCodeKey.USER_LOGOUT_SUCCESS: {
            'message': 'User logged out successfully',
            'status_code': 200
        },
        StatusCodeKey.USER_Token_INVALID: {
            'message': 'Invalid token',
            'status_code': 400
        },
        StatusCodeKey.USER_NOT_FOUND: {
            'message': 'User not found',
            'status_code': 404
        },
        StatusCodeKey.USER_INFO_SUCCESS: {
            'message': 'User information retrieved successfully',
            'status_code': 200
        }
    }

    EMAIL: Dict[StatusCodeKey, StatusCodeDetails] = {
        StatusCodeKey.INVALID_EMAIL: {
            'message': 'Invalid email address',
            'status_code': 400
        },
        StatusCodeKey.VERIFICATION_CODE_SENT: {
            'message': 'Verification code sent successfully',
            'status_code': 200
        },
        StatusCodeKey.EMAIL_SENDING_FAILED: {
            'message': 'Failed to send verification code',
            'status_code': 400
        },
        StatusCodeKey.VERIFICATION_CODE_EXPIRED: {
            'message': 'Verification code has expired',
            'status_code': 400
        },
        StatusCodeKey.INVALID_VERIFICATION_CODE: {
            'message': 'Invalid verification code',
            'status_code': 400
        },
        StatusCodeKey.VERIFICATION_CODE_SUCCESS: {
            'message': 'Verification code validated successfully',
            'status_code': 200
        },
    }

    @classmethod
    def get_status_response(
        cls,
        status_category: StatusCodeCategory,
        status_key: StatusCodeKey
    ) -> Tuple[Dict[str, Any], int]:
        """
        Generate standardized API responses with proper typing and validation.
        
        Args:
            status_category: Category of the status code (e.g., StatusCodeCategory.USER)
            status_key: Specific status key within the category
            
        Returns:
            Tuple containing:
            - response_data: Dictionary with message
            - http_status_code: Appropriate HTTP status code
            
        Raises:
            ValueError: If invalid status category or key is provided
        """
        try:
            category = getattr(cls, status_category.value)
            status = category[status_key]
            
            return {
                'status_code': status['status_code'],
                'message': status['message']
            }, status['status_code']
            
        except (AttributeError, KeyError) as e:
            raise ValueError(f"Invalid status category or key: {str(e)}")
