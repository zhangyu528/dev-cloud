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


# 创建临时 Python 脚本执行升级
TEMP_SCRIPT=$(mktemp)
cat <<EOF > $TEMP_SCRIPT
from flask import Flask
from app import app
import os
import sys

with app.app_context():
    # 配置 migrations 目录路径
    migrations_dir = os.path.join(os.environ['PYTHONPATH'], "db/migrations")
    
    # 检查 migrations 目录是否存在
    if not os.path.exists(migrations_dir):
        print(f"Error: Migrations directory not found at {migrations_dir}")
        print("Please run run_init_db.sh first to initialize the migrations directory")
        sys.exit(1)
    
    # 执行数据库升级
    from flask_migrate import upgrade
    upgrade(directory=migrations_dir)
EOF

echo "Applying database migrations..."
if python $TEMP_SCRIPT; then
    rm $TEMP_SCRIPT
    echo "Database migrations applied successfully"
else
    echo "Failed to apply database migrations"
    exit 1
fi
