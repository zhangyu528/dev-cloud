#!/bin/bash

# 检查是否已安装 Docker
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker first."
    exit 1
fi

# 检查是否已安装 Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# 创建网络
docker network create Traefik-network

# 启动 Docker Compose 服务
echo "Starting Docker Compose services..."
docker-compose up -d

# 显示服务状态
#echo "Services are running:"
#docker-compose ps