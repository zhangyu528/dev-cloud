#!/bin/bash

# 检查 DevSpace 是否已安装
if command -v devspace &> /dev/null; then
    echo "✅ DevSpace is already installed."
    devspace version
    exit 0
fi

# 检查操作系统
OS=$(uname)

# 安装 DevSpace
echo "🚀 Installing DevSpace..."

if [[ "$OS" == "Linux" ]]; then
    # 对于 Linux 用户
    curl -L -o devspace "https://github.com/loft-sh/devspace/releases/latest/download/devspace-linux-amd64" && sudo install -c -m 0755 devspace /usr/local/bin
elif [[ "$OS" == "Darwin" ]]; then
    # 对于 macOS 用户
    brew install devspace
elif [[ "$OS" == "CYGWIN"* || "$OS" == "MINGW"* || "$OS" == "MSYS"* ]]; then
    # 对于 Windows 用户

    # 检查 Scoop 是否已安装
    if ! command -v scoop &> /dev/null; then
        echo "❌ Scoop 未安装，正在安装 Scoop..."
        powershell.exe -Command "& {Set-ExecutionPolicy RemoteSigned -Scope CurrentUser; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12; irm get.scoop.sh | iex}"
        # 获取当前用户的 Path
CURRENT_PATH=$(powershell.exe -Command "[System.Environment]::GetEnvironmentVariable('Path', [System.EnvironmentVariableTarget]::User)")
        # 将 $HOME 转换为 Windows 风格的路径
        WINDOWS_HOME=$(cygpath -w "$HOME")
        export SCOOP_HOME="$WINDOWS_HOME/scoop"
        # 添加 Scoop 的路径到用户环境变量
        NEW_PATH="$CURRENT_PATH;$SCOOP_HOME/shims;$SCOOP_HOME/apps/scoop/current/bin"
        powershell.exe -Command "[System.Environment]::SetEnvironmentVariable('Path', '$NEW_PATH', [System.EnvironmentVariableTarget]::User)"
    else
        echo "✅ Scoop 已安装"
    fi

    # 安装 DevSpace
    echo "🚀 正在安装 DevSpace..."
    scoop install devspace
else
    echo "❌ Unsupported OS: $OS"
    echo "❌ Please install DevSpace manually."
    exit 1
fi

# 验证安装
if command -v devspace &> /dev/null; then
    echo "✅ DevSpace installed successfully!"
    devspace version
else
    echo "❌ DevSpace installation failed."
    exit 1
fi