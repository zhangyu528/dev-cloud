#!/bin/bash

# 获取当前脚本的目录
SCRIPT_DIR_DB=$(cd "$(dirname "$0")"; pwd)
# 项目根目录：使用 Git 获取项目的根目录
PROJECT_DIR=$(cd "$SCRIPT_DIR_DB" && git rev-parse --show-toplevel)

# 激活虚拟环境
source "$SCRIPT_DIR_DB/../utils/venv.sh"
create_venv
activate_venv

# 安装项目依赖
source "$SCRIPT_DIR_DB/../utils/requirements.sh"
install_requirements

export PYTHONPATH="$PROJECT_DIR/backend"
echo "PYTHONPATH set to: $PYTHONPATH"

# 创建临时 Python 脚本执行初始化
TEMP_SCRIPT=$(mktemp)
cat <<EOF > $TEMP_SCRIPT
from flask import Flask
from flask_migrate import Migrate
from app import create_app
from config import DevelopmentConfig
import os

app = create_app(DevelopmentConfig)

with app.app_context():
    # 配置 migrations 目录路径
    migrations_dir = os.path.join(os.environ['PYTHONPATH'], "db/migrations")
    
    # 初始化数据库迁移
    from flask_migrate import init
    init(directory=migrations_dir)
EOF

echo "Initializing database migrations..."
if python $TEMP_SCRIPT; then
    rm $TEMP_SCRIPT
    echo "Database migrations initialized successfully"
else
    echo "Failed to initialize database migrations"
    exit 1
fi
