#!/bin/bash
# 强制使用 UTF-8 编码
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

# 检测操作系统类型
OS=$(uname -s)

# 根据操作系统类型选择不同的包管理和安装方式
if [[ "$OS" == "Linux"* ]]; then
    # Linux (Ubuntu/Debian)
    apt-get update
    apt-get install -y python3 python3-pip python3-venv
elif [[ "$OS" == "Darwin"* ]]; then
    # macOS
    brew update
    brew install python
elif [[ "$OS" == "MINGW"* ]] || [[ "$OS" == "MSYS"* ]] || [[ "$OS" == "CYGWIN"* ]]; then
    # Windows (使用 chocolatey)
    choco install python -y
fi
echo "Python 环境已安装。"