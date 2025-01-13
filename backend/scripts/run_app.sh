#!/bin/bash

# 获取脚本所在目录
SCRIPT_DIR_APP=$(cd "$(dirname "$0")"; pwd)

# 项目根目录：使用 Git 获取项目的根目录
PROJECT_DIR=$(cd "$SCRIPT_DIR_APP" && git rev-parse --show-toplevel)
echo "Project directory: $PROJECT_DIR"

# 激活虚拟环境
source "$SCRIPT_DIR_APP/utils/venv.sh"
create_venv
activate_venv

# 安装项目依赖
source "$SCRIPT_DIR_APP/utils/requirements.sh"
install_requirements


export PYTHONPATH="$PROJECT_DIR/backend"
echo "PYTHONPATH set to: $PYTHONPATH"

# 导入项目环境变量，如果需要的话
export FLASK_APP=app.py
export FLASK_ENV=development  # 或者设置为 'production'

# 启动 Flask 服务
echo "Starting Flask server..."
python -m app  # 这里可以调用你之前在 app.py 里的启动逻辑

# 如果你使用 Gunicorn 或其他生产环境的服务器来运行应用，可以替换成如下命令：
# gunicorn --workers 4 --bind 0.0.0.0:5000 app:app

