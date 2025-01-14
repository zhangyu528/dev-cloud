# Backend 快速启动指南

## 运行步骤

### 1. 安装Python环境（如未安装）
```bash
./backend/scripts/install/install_python_env.sh
```

### 2. 数据库迁移（仅在首次运行时需要）
```bash
./backend/scripts/db/run_migrate_db.sh
```

### 3. 运行应用
```bash
./backend/scripts/run_app.sh
```

## 环境变量
- `FLASK_APP=app.py`
- `FLASK_ENV=development|production`
- `PYTHONPATH=backend/`

## 项目结构
```
backend/
├── api/             # API路由
│   ├── middleware/  # 中间件
│   └── *.py         # API接口实现
├── config/          # 配置文件
│   ├── dev/         # 开发环境配置
│   ├── test/        # 测试环境配置
│   └── *.py         # 环境配置
├── db/              # 数据库相关
│   └── migrations/  # 数据库迁移脚本
├── models/          # 数据模型
├── scripts/         # 脚本文件
│   ├── db/          # 数据库脚本
│   ├── install/     # 安装脚本
│   └── utils/       # 工具脚本
├── tests/           # 测试代码
└── app.py           # 应用入口
