#!/bin/bash

# 获取脚本所在目录
SCRIPT_DIR=$(cd "$(dirname "$0")"; pwd)

# 项目根目录：使用 Git 获取项目的根目录
PROJECT_DIR=$(cd "$SCRIPT_DIR" && git rev-parse --show-toplevel)
echo "Project directory: $PROJECT_DIR"

export PYTHONPATH="$PROJECT_DIR"
echo "PYTHONPATH set to: $PYTHONPATH"

# 虚拟环境目录（根据实际路径修改）
VENV_DIR="$PROJECT_DIR/backend/venv"
echo "Virtual environment directory: $VENV_DIR"

# 激活虚拟环境的函数
activate_venv() {
    if [[ "$OSTYPE" == "linux-gnu"* || "$OSTYPE" == "darwin"* ]]; then
        # Linux 或 macOS
        source "$VENV_DIR/bin/activate"
    elif [[ "$OSTYPE" == "cygwin" || "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
        # Windows
        if [[ -f "$VENV_DIR/Scripts/activate" ]]; then
            # PowerShell
            source "$VENV_DIR/Scripts/activate"
        elif [[ -f "$VENV_DIR/Scripts/activate.bat" ]]; then
            # 命令行
            "$VENV_DIR/Scripts/activate.bat"
        fi
    else
        echo "Unsupported OS type: $OSTYPE"
        exit 1
    fi
    # 确认虚拟环境已激活
    echo "Virtual environment activated: $VENV_DIR"
}

# 检查虚拟环境是否存在
if [[ ! -d "$VENV_DIR" ]]; then
    echo "Virtual environment not found at $VENV_DIR"
    echo "Creating virtual environment..."

    # 创建虚拟环境
    python -m venv "$VENV_DIR" || {
        echo "Failed to create virtual environment."
        exit 1
    }

    echo "Virtual environment created at $VENV_DIR"
    
    # 激活虚拟环境
    activate_venv

    echo "Installing dependencies..."
    # 安装项目依赖
    pip install -r "$PROJECT_DIR/backend/requirements.txt" -q || {
        echo "Failed to install dependencies."
        exit 1
    }
else
    echo "Virtual environment found. Activating..."

    # 激活虚拟环境
    activate_venv

    echo "Updating dependencies..."
    # 更新项目依赖
    pip install --upgrade -r "$PROJECT_DIR/backend/requirements.txt" -q || {
        echo "Failed to update dependencies."
        exit 1
    }
fi

# 确认虚拟环境已激活
if [[ -z "$VENV_DIR" ]]; then
    echo "Virtual environment activation failed."
    exit 1
fi

# 测试文件路径
TEST_PATH="$PROJECT_DIR/backend/tests"

# 切换到脚本所在目录（tests 文件夹）
cd "$TEST_PATH" || exit

# 运行测试文件并生成覆盖率数据
echo "Running user API tests..."
python -m coverage run -m pytest "$TEST_PATH"

# 生成终端覆盖率报告
echo "Generating coverage report..."
python -m coverage report -m

# 生成 HTML 报告
echo "Generating HTML coverage report..."
python -m coverage html -d "$TEST_PATH/htmlcov"

# 在默认浏览器中打开 HTML 报告
HTML_REPORT="$TEST_PATH/htmlcov/index.html"

if [[ "$OSTYPE" == "darwin"* ]]; then
    open "$HTML_REPORT"  # macOS
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open "$HTML_REPORT"  # Linux
elif [[ "$OSTYPE" == "cygwin" || "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    start "$HTML_REPORT"  # Windows
else
    echo "Please open the report manually: $HTML_REPORT"
fi
