from .test.database import TestDatabaseConfig
from .test.security import TestSecurityConfig
from .test.logging import TestLoggingConfig
from .test.cors import TestCORSConfig
from .test.swagger import TestSwaggerConfig

class TestConfig(
    TestDatabaseConfig,
    TestSecurityConfig,
    TestLoggingConfig,
    TestCORSConfig,
    TestSwaggerConfig
):
    DEBUG = False
    TESTING = True
