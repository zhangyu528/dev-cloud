class DevSwaggerConfig:
    SWAGGER_TEMPLATE = {
        "swagger": "2.0",
        "info": {
            "title": "API Documentation",
            "description": "Development environment API documentation",
            "version": "1.0.0"
        },
        "basePath": "/api",
        "schemes": ["http"],
        "securityDefinitions": {
            "Bearer": {
                "type": "apiKey",
                "name": "Authorization",
                "in": "header"
            }
        }
    }

    SWAGGER_CONFIG = {
        "headers": [],
        "specs": [
            {
                "endpoint": 'apispec',
                "route": '/apispec.json',
                "rule_filter": lambda rule: True,
                "model_filter": lambda tag: True,
            }
        ],
        "static_url_path": "/flasgger_static",
        "swagger_ui": True,
        "specs_route": "/apidocs/"
    }
