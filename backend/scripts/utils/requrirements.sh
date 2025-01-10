#!/bin/bash

# 获取脚本所在目录
SCRIPT_DIR=$(cd "$(dirname "$0")"; pwd)
# 项目根目录：使用 Git 获取项目的根目录
PROJECT_DIR=$(cd "$SCRIPT_DIR" && git rev-parse --show-toplevel)

install_requirements() {
    # 安装项目依赖
    pip install -r "$PROJECT_DIR/backend/requirements.txt" -q || {
        echo "Failed to install dependencies."
        exit 1
    }
}

update_requirements() {
    # 更新项目依赖
    pip install -r "$PROJECT_DIR/backend/requirements.txt" --upgrade -q || {
        echo "Failed to update dependencies."
        exit 1
    }
}