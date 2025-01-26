from .dev.database import DevDatabaseConfig
from .dev.security import DevSecurityConfig
from .dev.logging import DevLoggingConfig
from .dev.cors import DevCORSConfig

class DevelopmentConfig(
    DevDatabaseConfig,
    DevSecurityConfig,
    DevLoggingConfig,
    DevCORSConfig,
):
    DEBUG = True
    TESTING = False
