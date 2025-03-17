#!/bin/bash

# 检测操作系统类型
OS=$(uname -s)

# 检查并安装 Python3
if ! command -v python &> /dev/null
then
    echo "🚀 Python not found. Installing Python..."
    
    if [[ "$OS" == "Linux"* ]]; then
        # Linux (Ubuntu/Debian)
        sudo apt update
        sudo apt install python3 python3-pip -y
    elif [[ "$OS" == "Darwin"* ]]; then
        # macOS
        brew update
        brew install python@3.11.0
    elif [[ "$OS" == "MINGW"* ]] || [[ "$OS" == "MSYS"* ]] || [[ "$OS" == "CYGWIN"* ]]; then
        # Windows (使用 Chocolatey)
        #curl -o python-installer.exe https://www.python.org/ftp/python/3.11.0/python-3.11.0-amd64.exe
        # 执行安装程序
        #./python-installer.exe /quiet PrependPath=1

         # 检查安装是否成功
        if command -v python &> /dev/null; then
            echo "✅ Python installed successfully."
        else
            echo "❌ Python installation failed."
            exit 1
        fi
    else
        echo "❌ Unsupported OS. Please install Python manually."
        exit 1
    fi
else
    echo "✅ Python is already installed."
fi