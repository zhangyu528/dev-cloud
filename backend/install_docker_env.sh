#!/bin/bash

# 检查 Docker 是否已安装
if command -v docker &> /dev/null; then
    echo "✅ Docker is already installed."
    docker --version
    exit 0
fi

# 检测操作系统
OS=$(uname)

case $OS in
    Linux)
        # 检测 Linux 发行版
        DISTRO=$(cat /etc/*release | grep ^ID= | cut -d'=' -f2 | tr -d '"')
        
        case $DISTRO in
            ubuntu)
                echo "🚀 Detected Ubuntu. Installing Docker..."
                sudo apt-get update
                sudo apt-get install -y docker.io
                ;;
            centos)
                echo "🚀 Detected CentOS. Installing Docker..."
                sudo yum install -y docker
                ;;
            fedora)
                echo "🚀 Detected Fedora. Installing Docker..."
                sudo dnf install -y docker
                ;;
            debian)
                echo "🚀 Detected Debian. Installing Docker..."
                sudo apt-get update
                sudo apt-get install -y docker.io
                ;;
            *)
                echo "❌ Unsupported Linux distribution: $DISTRO"
                echo "❌ Please install Docker manually."
                exit 1
                ;;
        esac
        ;;
    Darwin)
        echo "🚀 Detected macOS. Please download Docker Desktop from:"
        echo "https://www.docker.com/products/docker-desktop"
        echo "Follow the installation instructions on the website."
        ;;
    *Microsoft*)
        echo "🚀 Detected Windows. Please download Docker Desktop from:"
        echo "https://www.docker.com/products/docker-desktop"
        echo "Follow the installation instructions on the website."
        ;;
    *)
        echo "❌ Unsupported OS: $OS"
        echo "❌ Please install Docker manually."
        exit 1
        ;;
esac

# 启动 Docker 服务（仅适用于 Linux）
if [ "$OS" == "Linux" ]; then
    sudo systemctl start docker
    sudo systemctl enable docker
    echo "✅ Docker installed and started successfully."
    docker --version
fi