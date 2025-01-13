from config.dev.swagger import DevSwaggerConfig

class TestSwaggerConfig(DevSwaggerConfig):
    """测试环境 Swagger 配置"""
    SWAGGER = {
        **DevSwaggerConfig.SWAGGER,
        "specs_route": "/test-api/docs",
        "title": "Test API Documentation",
        "description": "API documentation for testing environment",
        "version": "1.0.0-test"
    }
