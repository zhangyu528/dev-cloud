#!/bin/bash

# 获取脚本所在目录
PROJECT_DIR=$(cd "$(dirname "$0")"; pwd)

install_requirements() {
    echo "Installing project dependencies..."
    # 安装项目依赖
    python -m pip install -r "$PROJECT_DIR/requirements.txt" -q || {
        echo "Failed to install dependencies."
        exit 1
    }
    echo "Dependencies installed successfully."
}

update_requirements() {
    echo "Updating project dependencies..."
    # 更新项目依赖
    python -m pip install -r "$PROJECT_DIR/requirements.txt" --upgrade -q || {
        echo "Failed to update dependencies."
        exit 1
    }
    echo "Dependencies updated successfully."
}

update_pip() {
    echo "Updating pip..."
    # 更新 pip
    python -m pip install --upgrade pip -q || {
        echo "Failed to update pip."
        exit 1
    }
    echo "Pip updated successfully."
}