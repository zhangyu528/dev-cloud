#!/bin/bash
set -e  # 遇到错误立即退出

# 获取脚本相关路径
SCRIPT_DIR=$(cd "$(dirname "$0")"; pwd)

# 设置Flask应用环境变量
export FLASK_APP=app.py
echo "🚀 FLASK_APP set to: $FLASK_APP"

# 检查数据库配置
if [ ! -f ".env" ]; then
    echo "⚠️ Warning: .env file not found in backend directory. Database connection might fail."
fi

# 检查migrations目录是否已存在
MIGRATIONS_DIR="./db/migrations"
if [ -d "$MIGRATIONS_DIR" ]; then
    echo "⚠️ Warning: migrations directory already exists at $MIGRATIONS_DIR"
    read -p "Do you want to continue and overwrite the existing migrations directory? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Operation cancelled"
        exit 0
    fi
    
    # 如果用户确认，删除现有的migrations目录
    echo "🚀 Removing existing migrations directory..."
    rm -rf "$MIGRATIONS_DIR"
fi

# 确保父目录存在
mkdir -p "$(dirname "$MIGRATIONS_DIR")"

echo "🚀 Running database migration initialization..."
if poetry run flask db init --directory "$MIGRATIONS_DIR"; then
    echo "✅ Database migration initialization completed successfully"
else
    echo "❌ Failed to initialize database migrations"
    exit 1
fi
