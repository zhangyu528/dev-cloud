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
    python -m pip install --upgrade pip
fi
echo "Python 环境已安装。"

# 创建虚拟环境（跨平台）
if [[ "$OS" == "Linux"* ]] || [[ "$OS" == "Darwin"* ]]; then
    python3 -m venv venv
elif [[ "$OS" == "MINGW"* ]] || [[ "$OS" == "MSYS"* ]] || [[ "$OS" == "CYGWIN"* ]]; then
    python -m venv venv
fi

echo "虚拟环境已创建。"

# 激活虚拟环境（不同平台不同）
if [[ "$OS" == "Linux"* ]] || [[ "$OS" == "Darwin"* ]]; then
    source venv/bin/activate
elif [[ "$OS" == MINGW* ]] || [[ "$OS" == MSYS* ]] || [[ "$OS" == CYGWIN* ]]; then
    source venv/Scripts/activate
fi

# 检查虚拟环境是否成功激活
if [ -z "$VIRTUAL_ENV" ]; then
    echo "虚拟环境未成功激活！"
    exit 1
fi
echo "Python 虚拟环境已激活。"

# 安装依赖
pip install -r backend/requirements.txt
echo "依赖已安装。"

# 完成提示
echo "Python 环境安装完成"
