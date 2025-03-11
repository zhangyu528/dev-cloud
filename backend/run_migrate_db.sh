#!/bin/bash
set -e  # 遇到错误立即退出

# 获取脚本相关路径
SCRIPT_DIR=$(cd "$(dirname "$0")"; pwd)


# 设置Flask应用环境变量
export FLASK_APP=app.py
export FLASK_ENV=development
echo "FLASK_APP set to: $FLASK_APP"

# 检查数据库配置
if [ ! -f ".env" ]; then
    echo "Warning: .env file not found in backend directory. Database connection might fail."
fi

# 检查migrations目录是否存在
MIGRATIONS_DIR="./db/migrations"
if [ ! -d "$MIGRATIONS_DIR" ]; then
    echo "Error: Migrations directory not found at $MIGRATIONS_DIR"
    echo "Please run run_init_db.sh first to initialize the migrations directory"
    exit 1
fi

echo "Running database migrations..."

# 步骤1: 生成迁移脚本 (检测模型变化并创建迁移文件)
echo "Generating migration script..."
if ! poetry run flask db migrate --directory "$MIGRATIONS_DIR" --message "Auto-generated migration"; then
    echo "❌ Failed to generate migration script"
    exit 1
fi

# 步骤2: 执行数据库迁移 (应用迁移到数据库)
echo "Applying migrations to database..."
if ! poetry run flask db upgrade --directory "$MIGRATIONS_DIR"; then
    echo "❌ Failed to apply migrations to database"
    exit 1
fi

echo "✅ Database migrations completed successfully"
