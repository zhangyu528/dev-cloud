# DevCloud Backend

## 项目概述

DevCloud 是一个现代化的开发者工作流管理平台，提供容器、模板和用户管理等功能。

* * *

## 技术栈

* **后端框架**: Flask
* **数据库**: SQLAlchemy
* **认证**: Flask-JWT-Extended
* **测试**: Pytest

* * *

## 项目结构

    backend/
    ├── api/                # API 路由和视图
    │   ├── user.py         # 用户相关接口
    │   ├── container_mng.py # 容器管理接口
    │   └── templates_mng.py # 模板管理接口
    ├── config/             # 配置文件
    │   ├── prod_config.py  # 生产环境配置
    │   └── test_config.py  # 测试环境配置
    ├── db/                 # 数据库相关
    │   ├── models/         # 数据模型
    │   │   ├── user.py     # 用户模型
    │   │   └── container.py # 容器模型
    │   └── create_tables.py # 数据库表创建脚本
    └── test/               # 测试目录
        ├── test_user.py    # 用户相关测试
        └── conftest.py     # Pytest 配置

* * *

## 环境准备

### 依赖安装

    # 执行以下脚本安装依赖
    setup_python_env.sh
    start_app.sh

* * *

## 运行应用

### 开发模式

    # 启动 Flask 开发服务器
    python backend/app.py

### 运行测试

    # 执行 Pytest
    pytest backend/test/

* * *

## 主要功能

1. 用户注册和认证
2. 容器管理
3. 模板管理
4. JWT 鉴权

* * *

## 配置说明

* `config/prod_config.py`: 生产环境配置
* `config/test_config.py`: 测试环境配置

* * *

## 安全特性

* 密码哈希存储
* JWT 令牌认证
* 跨域资源共享 (CORS)