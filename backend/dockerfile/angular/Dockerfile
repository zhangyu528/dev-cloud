# 使用基础镜像
FROM node:20

# 设置环境变量为开发模式
ENV NODE_ENV=development

# 安装 Angular CLI（全局安装）
RUN npm install -g @angular/cli@15.0.0

# 复制脚本文件到容器中
COPY vscode_server_install.sh /usr/local/bin/vscode_server_install.sh
# 给脚本可执行权限
RUN chmod +x /usr/local/bin/vscode_server_install.sh
# 执行vscode server install脚本
RUN /usr/local/bin/vscode_server_install.sh


# 设置工作目录
WORKDIR /home/developer

# 创建 developer 用户
RUN groupadd -g 1001 developer && \
    useradd -m -u 1001 -g developer -s /bin/bash developer

RUN chown -R developer:developer /home/developer
# 切换到 developer 用户
USER developer

# 公开端口 4200
EXPOSE 4200
EXPOSE 8080


# 复制 entrypoint.sh 脚本到容器中
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

# 设置容器启动时执行的命令
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
