from .dev.database import DevDatabaseConfig
from .dev.security import DevSecurityConfig
from .dev.logging import DevLoggingConfig
from .dev.cors import DevCORSConfig
from .dev.swagger import DevSwaggerConfig

class DevelopmentConfig(
    DevDatabaseConfig,
    DevSecurityConfig,
    DevLoggingConfig,
    DevCORSConfig,
    DevSwaggerConfig
):
    DEBUG = True
    TESTING = False
