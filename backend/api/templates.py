TEMPLATES = {
    "python-dev": {
        "image": "python:3.9-slim",
        "default_cmd": "bash",
        "env_vars": {"LANG": "en_US.UTF-8"},
        "ports": {"8888": "8888"},
    },
    "nodejs-dev": {
        "image": "node:16",
        "default_cmd": "bash",
        "env_vars": {"NODE_ENV": "development"},
        "ports": {"3000": "3000"},
    },
    "java-dev": {
        "image": "openjdk:11",
        "default_cmd": "bash",
        "env_vars": {"JAVA_HOME": "/usr/lib/jvm/java-11-openjdk-amd64"},
        "ports": {"8080": "8080"},
    },
}
