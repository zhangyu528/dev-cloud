from .dev.database import DevDatabaseConfig
from .dev.security import DevSecurityConfig

class UnitTestConfig(DevDatabaseConfig, DevSecurityConfig):
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False

    TESTING = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
    SWAGGER_ENABLED = False
