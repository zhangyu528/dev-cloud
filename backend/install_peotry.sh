#!/bin/bash

# 检查操作系统
OS=$(uname)

if [[ "$OS" == "Linux" || "$OS" == "Darwin" ]]; then
    # 对于 Linux 和 macOS 用户
    echo "🚀 Installing Poetry for Linux/macOS..."
    curl -sSL https://install.python-poetry.org | python3 -
elif [[ "$OS" == "CYGWIN"* || "$OS" == "MINGW"* || "$OS" == "MSYS"* ]]; then
    # 对于 Windows 用户
    echo "🚀 Installing Poetry for Windows..."
    (Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicP | python -)
else
    echo "❌ Unsupported OS: $OS"
    exit 1
fi

# 验证安装
if command -v poetry &> /dev/null; then
    echo "✅ Poetry installed successfully!"
    poetry --version
else
    echo "❌ Poetry installation failed."
    exit 1
fi