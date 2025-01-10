class DevCORSConfig:
    CORS_ORIGINS = [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:5000',
        'http://127.0.0.1:5000'
    ]
    CORS_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
    CORS_ALLOW_HEADERS = [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin',
        'Access-Control-Allow-Origin'
    ]
    CORS_EXPOSE_HEADERS = ['Content-Disposition']
    CORS_SUPPORTS_CREDENTIALS = True
    
    CORS_CONFIG = {
        'origins': CORS_ORIGINS,
        'methods': CORS_METHODS,
        'allow_headers': CORS_ALLOW_HEADERS,
        'expose_headers': CORS_EXPOSE_HEADERS,
        'supports_credentials': CORS_SUPPORTS_CREDENTIALS
    }
