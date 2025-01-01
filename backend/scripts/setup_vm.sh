#!/bin/bash


# 指定安装的版本
DOCKER_VERSION="20.10.24"
DOCKER_COMPOSE_VERSION="2.20.2"

echo "更新系统包管理器..."
sudo apt update -y && sudo apt upgrade -y

echo "安装必要的依赖工具..."
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

echo "添加 Docker 官方的 GPG 密钥..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "添加 Docker APT 源..."
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

echo "更新 APT 包索引..."
sudo apt update -y

echo "安装 Docker（版本 $DOCKER_VERSION）..."
sudo apt install -y docker-ce="$DOCKER_VERSION~3-0~ubuntu-$(lsb_release -cs)" docker-ce-cli="$DOCKER_VERSION~3-0~ubuntu-$(lsb_release -cs)" containerd.io

echo "验证 Docker 安装版本..."
docker --version

echo "下载并安装 Docker Compose（版本 $DOCKER_COMPOSE_VERSION）..."
sudo curl -L "https://github.com/docker/compose/releases/download/v$DOCKER_COMPOSE_VERSION/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo "验证 Docker Compose 安装版本..."
docker-compose --version

echo "将当前用户添加到 Docker 组..."
sudo usermod -aG docker $USER

echo "设置完成，请重新登录用户以便应用 Docker 用户组权限。"
