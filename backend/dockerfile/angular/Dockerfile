
# 使用 Node.js 作为基础镜像
FROM node:18

# 设置环境变量为开发模式
ENV NODE_ENV=development

# 安装 Angular CLI（全局安装）
RUN npm install -g @angular/cli

# 进入 user 目录
WORKDIR /home/user
# 公开端口
EXPOSE 4200

# 启动 Angular 开发服务器
CMD ["sh", "-c", "ng new ${PROJECT_NAME:-default-angular-app} --defaults --skip-git && cd ${PROJECT_NAME:-default-angular-app} && npm install && ng serve --host 0.0.0.0 --port 4200"]
