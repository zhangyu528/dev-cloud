#!/bin/bash

# 使用 Dockerfile 中设置的环境变量
echo "Running with project name: ${PROJECT_NAME}"
PROJECT_NAME=${PROJECT_NAME:-default-angular-app}

# 自动创建 Angular 项目
ng new ${PROJECT_NAME} --defaults --skip-git --skip-install \
    && cd ${PROJECT_NAME} \
    && npm install

# 启动 VS Code Server
code-server --auth none --bind-addr 0.0.0.0:8080 --open /home/coder/project/${PROJECT_NAME} --disable-telemetry --disable-update-check

# 启动 Angular 开发服务器
# ng serve --host 0.0.0.0 --port 4200

