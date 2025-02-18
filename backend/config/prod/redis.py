
class ProdRedisConfig:
    REDIS_URL = os.getenv('REDIS_URL', 'redis://localhost:6379')