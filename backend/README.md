# Backend 快速启动指南

## 运行步骤

### 0. 进入backend目录
```bash
cd d:/work/dev-cloud/backend
```
### 0.1 安装docker环境
```bash
./install_docker_env.sh
```

### 1. 安装Python环境
```bash
./install_python_env.sh
```
### 1.1 安装poetry
```bash
./install_poetry.sh
```
### 2. 数据库初始化

```bash
./run_migrate_db.sh
```

在以下情况也需要运行数据库升级：
- 修改了数据模型（models）后

注意：该命令会创建数据库文件并应用所有迁移脚本

### 3. 运行应用
```bash
./run_dev.sh
```
