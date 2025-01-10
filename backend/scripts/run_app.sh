#!/bin/bash
source backend/scripts/utils/venv.sh
source backend/scripts/utils/requrirements.sh

# 获取脚本所在目录
SCRIPT_DIR=$(cd "$(dirname "$0")"; pwd)

# 项目根目录：使用 Git 获取项目的根目录
PROJECT_DIR=$(cd "$SCRIPT_DIR" && git rev-parse --show-toplevel)
echo "Project directory: $PROJECT_DIR"

export PYTHONPATH="$PROJECT_DIR"
echo "PYTHONPATH set to: $PYTHONPATH"

# 导入虚拟环境激活函数
create_venv
activate_venv

# 安装项目依赖
install_requirements

# 导入项目环境变量，如果需要的话
export FLASK_APP=app.py
export FLASK_ENV=development  # 或者设置为 'production'

# 切换到项目目录
cd "$PROJECT_DIR" || exit

# 启动 Flask 服务
echo "Starting Flask server..."
python -m backend.app  # 这里可以调用你之前在 app.py 里的启动逻辑

# 如果你使用 Gunicorn 或其他生产环境的服务器来运行应用，可以替换成如下命令：
# gunicorn --workers 4 --bind 0.0.0.0:5000 app:app

