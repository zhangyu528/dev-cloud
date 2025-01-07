class StatusCodes:
    # 用户相关错误码
    USER = {
        'USER_REGISTRATION_SUCCESS': {
            'code': 'USER_000',
            'message': 'User registered successfully',
            'status_code': 201
        },
        'USERNAME_ALREADY_EXISTS': {
            'code': 'USER_001',
            'message': 'Username already exists',
            'status_code': 409
        },
        'EMAIL_ALREADY_EXISTS': {
            'code': 'USER_002', 
            'message': 'Email already registered',
            'status_code': 409
        },
        'INVALID_PASSWORD': {
            'code': 'USER_003',
            'message': 'Invalid password format',
            'status_code': 400
        },
        'INVALID_CREDENTIALS': {
            'code': 'USER_004',
            'message': 'Invalid username or password',
            'status_code': 401
        },
        'USER_LOGIN_SUCCESS': {
            'code': 'USER_005',
            'message': 'User logged in successfully',
            'status_code': 200
        },
        'USER_LOGOUT_SUCCESS': {
            'code': 'USER_006',
            'message': 'User logged out successfully',
            'status_code': 200
        }
    }

    EMAIL = {
        'INVALID_EMAIL': {
            'code': 'EMAIL_001',
            'message': 'Invalid email address',
            'status_code': 400
        },
        'VERIFICATION_CODE_SENT': {
            'code': 'EMAIL_002',
            'message': 'Verification code sent successfully',
            'status_code': 200
        },
        'EMAIL_SENDING_FAILED': {
            'code': 'EMAIL_003',
            'message': 'Failed to send verification code',
            'status_code': 500
        },
        'VERIFICATION_CODE_EXPIRED': {
            'code': 'EMAIL_004',
            'message': 'Verification code has expired',
            'status_code': 400
        },
        'INVALID_VERIFICATION_CODE': {
            'code': 'EMAIL_005',
            'message': 'Invalid verification code',
            'status_code': 400
        },
        'VERIFICATION_CODE_SUCCESS': {
            'code': 'EMAIL_006',
            'message': 'Verification code validated successfully',
            'status_code': 200
        }
    }

    # 模板相关错误码
    TEMPLATE = {
        'TEMPLATE_NOT_FOUND': {
            'code': 'TEMPLATE_001',
            'message': 'Template not found',
            'status_code': 404
        }
    }

    # 容器相关错误码
    CONTAINER = {
        'CONTAINER_NOT_FOUND': {
            'code': 'CONTAINER_001',
            'message': 'Container not found',
            'status_code': 404
        }
    }

def get_status_response(status_category, status_key):
    """
    生成标准化的错误响应
    
    :param status_category: 错误码类别 (如 USER, TEMPLATE)
    :param status_key: 具体错误码键
    :return: 错误信息字典
    """
    status = getattr(StatusCodes, status_category)[status_key]
    return {
        'error_code': status['code'],
        'message': status['message']
    }, status['status_code']