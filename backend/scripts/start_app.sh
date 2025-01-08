# scripts/start_flask.sh

#!/bin/bash

# 激活虚拟环境 (如果你使用虚拟环境的话)
if [ -f ".venv/bin/activate" ]; then
    source .venv/bin/activate
else
    echo "Virtual environment not found, skipping activation."
fi

# 导入项目环境变量，如果需要的话
export FLASK_APP=app.py
export FLASK_ENV=development  # 或者设置为 'production'

# 安装依赖，如果没有安装过依赖的话
echo "Installing dependencies..."
pip install -r ./requirements.txt

# 获取脚本的绝对路径（Windows 兼容版本）
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -W )"

# 切换到项目根目录
cd "$SCRIPT_DIR/../.."

# 获取完整的绝对路径（使用 Windows 风格路径）
PROJECT_ROOT="$(pwd -W)"

# 设置 PYTHONPATH 到项目根目录
export PYTHONPATH="$PROJECT_ROOT;$PYTHONPATH"
echo "PYTHONPATH: $PYTHONPATH"

# 检测虚拟环境 Python 解释器
if [ -f "venv/bin/python" ]; then
    # Unix/Linux 路径
    PYTHON_PATH="venv/bin/python"
elif [ -f "venv/Scripts/python.exe" ]; then
    # Windows 路径
    PYTHON_PATH="venv/Scripts/python.exe"
else
    # 回退到系统 Python
    PYTHON_PATH="python"
fi
echo "PYTHON_PATH: $PYTHON_PATH"
# 启动 Flask 服务
echo "Starting Flask server..."
"$PYTHON_PATH" -m backend.app  # 这里可以调用你之前在 app.py 里的启动逻辑

# 如果你使用 Gunicorn 或其他生产环境的服务器来运行应用，可以替换成如下命令：
# gunicorn --workers 4 --bind 0.0.0.0:5000 app:app

