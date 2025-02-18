from .dev.database import DevDatabaseConfig
from .dev.security import DevSecurityConfig
from .dev.logging import DevLoggingConfig
from .dev.cors import DevCORSConfig
from .dev.redis import DevRedisConfig

class DevelopmentConfig(
    DevDatabaseConfig,
    DevSecurityConfig,
    DevLoggingConfig,
    DevCORSConfig,
    DevRedisConfig,
):
    DEBUG = True
    TESTING = False
