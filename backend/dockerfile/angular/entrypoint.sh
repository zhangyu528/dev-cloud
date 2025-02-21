#!/bin/bash
PROJECT_NAME=${PROJECT_NAME:-default-angular-app}

# 启动 VS Code Server
code-server --auth none --bind-addr 0.0.0.0:8080 \
 --open /home/developer/${PROJECT_NAME} \
 --disable-telemetry --disable-update-check &

# 使用 Dockerfile 中设置的环境变量
echo "PROJECT_NAME: ${PROJECT_NAME}"
# 自动创建 Angular 项目
ng new ${PROJECT_NAME} --defaults --skip-git --skip-install \
    && cd ${PROJECT_NAME} \
    && npm install

echo "Angular project served: ${PROJECT_NAME}"
# 启动 Angular 开发服务器
ng serve --host 0.0.0.0 --port 4200
