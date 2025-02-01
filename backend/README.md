# Backend 快速启动指南

## 运行步骤

### 0. 进入backend目录
```bash
cd d:/work/dev-cloud/backend
```

### 1. 安装Python环境（如未安装）
```bash
./install_python_env.sh
```

### 2. 数据库初始化与升级

由于数据库文件不在代码库中，首次运行需要初始化数据库：

```bash
./scripts/db/run_upgrade_db.sh
```

在以下情况也需要运行数据库升级：
- 修改了数据模型（models）后

注意：该命令会创建数据库文件并应用所有迁移脚本

### 3. 运行应用
```bash
./run_app.sh
```
