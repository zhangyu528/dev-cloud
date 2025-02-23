#!/bin/bash

# 获取脚本所在目录
PROJECT_DIR=$(cd "$(dirname "$0")"; pwd)

# 导入项目环境变量，如果需要的话
export FLASK_APP=app.py
export FLASK_ENV=development  # 或者设置为 'production'

# 安装依赖项
poetry install --no-root

# 启动 Flask 服务
echo "Starting Flask server..."
poetry run flask run  # 使用 flask-restx 启动

# 如果你使用 Gunicorn 或其他生产环境的服务器来运行应用，可以替换成如下命令：
# gunicorn --workers 4 --bind 0.0.0.0:5000 app:app

