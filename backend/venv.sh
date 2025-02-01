#!/bin/bash

# 获取当前脚本路径，即使通过 source 调用也能正常获取
get_script_dir() {
  local SOURCE="${BASH_SOURCE[0]}"
  while [ -h "$SOURCE" ]; do
    local DIR="$(cd -P "$(dirname "$SOURCE")" && pwd)"
    SOURCE="$(readlink "$SOURCE")"
    [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE"
  done
  echo "$(cd -P "$(dirname "$SOURCE")" && pwd)"
}

# 获取脚本所在目录
PROJECT_DIR=$(get_script_dir)

# 虚拟环境目录（根据实际路径修改）
VENV_DIR="$PROJECT_DIR/venv"

# 创建虚拟环境的函数
create_venv() {
    echo "Virtual environment directory: $VENV_DIR"

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
        
    else
        echo "Virtual environment found at $VENV_DIR"
    fi
    # 检查虚拟环境是否创建成功
    if [[ -z "$VENV_DIR" ]]; then
        echo "Failed to create virtual environment."
        exit 1
    fi
}
# 激活虚拟环境的函数
activate_venv() {
    echo "Virtual environment found. Activating..."

    if [[ "$OSTYPE" == "linux-gnu"* || "$OSTYPE" == "darwin"* ]]; then
        # Linux 或 macOS
        source "$VENV_DIR/bin/activate"
    elif [[ "$OSTYPE" == "cygwin" || "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
        # Windows
        if [[ -f "$VENV_DIR/Scripts/activate" ]]; then
            # Git Bash 或其他终端
            source "$VENV_DIR/Scripts/activate"
        elif [[ -f "$VENV_DIR/Scripts/activate.bat" ]]; then
            # CMD
            "$VENV_DIR/Scripts/activate.bat"
        elif [[ -f "$VENV_DIR/Scripts/Activate.ps1" ]]; then
            # PowerShell
            source "$VENV_DIR/Scripts/Activate.ps1"
        fi
    else
        echo "Unsupported OS type: $OSTYPE"
        exit 1
    fi

    # 检查虚拟环境是否已激活
    if [[ -z "$VIRTUAL_ENV" ]]; then
        echo "Virtual environment is not activated."
        exit 1
    else
        echo "Virtual environment is activated."
    fi
    # 确认虚拟环境已激活
    echo "Virtual environment activated: $VENV_DIR"
}