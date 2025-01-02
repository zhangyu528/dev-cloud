swagger_template = {
    "swagger": "2.0",
    "info": {
        "title": "DevCloud API",
        "description": "DevCloud 后端 API 文档",
        "version": "1.0.0",
        "contact": {
            "name": "DevCloud Team",
            "email": "support@devcloud.com"
        }
    },
    "host": "localhost:5000",  # 根据实际部署环境调整
    "basePath": "/api",
    "schemes": [
        "http",
        "https"
    ],
    "securityDefinitions": {
        "Bearer": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header"
        }
    },
    "security": [
        {
            "Bearer": []
        }
    ]
}

swagger_config = {
    "headers": [],
    "specs": [
        {
            "endpoint": 'apispec_1',
            "route": '/apispec_1.json',
            "rule_filter": lambda rule: True,
            "model_filter": lambda tag: True,
        }
    ],
    "static_url_path": "/flasgger_static",
    "swagger_ui": True,
    "specs_route": "/apidocs/"
}