#!/bin/bash

# 脚本出错时立即退出
set -e

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
# 使用检测到的 Python 解释器
"$PYTHON_PATH" -m backend.db.create_tables
echo "Database tables created successfully."