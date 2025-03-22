# 使用基础镜像
FROM node:20

# 设置环境变量为开发模式
ENV NODE_ENV=development

# 安装 Angular CLI（全局安装）
RUN npm install -g @angular/cli@15.0.0

# 更新系统并安装 tree
#RUN apt-get update && apt-get install -y tree

# 设置工作目录
WORKDIR /app

# 公开端口 4200
EXPOSE 4200


# 复制 entrypoint.sh 脚本到容器中
#COPY entrypoint.sh /usr/local/bin/entrypoint.sh

# 设置容器启动时执行的命令
#ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
