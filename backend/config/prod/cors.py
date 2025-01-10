class ProdCORSConfig:
    CORS_CONFIG = {
        "resources": {
            r"/api/*": {
                "origins": os.getenv('ALLOWED_ORIGINS', '').split(','),
                "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                "allow_headers": ["Content-Type", "Authorization"],
                "supports_credentials": True,
                "max_age": 600
            }
        }
    }
