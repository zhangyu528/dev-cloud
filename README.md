# Project Overview

This is a full-stack application with a backend API service and a frontend Next.js application.

## Backend

### Tech Stack
- Python
- Flask
- SQLAlchemy
- SMTP

### Key Features
- User authentication API
- Email verification with SMTP
- RESTful API endpoints
- Unit testing with pytest
- Configuration management for different environments

### Directory Structure
```
backend/
├── api/               # API endpoints
├── config/            # Configuration files
├── db/                # Database models
├── scripts/           # Utility scripts
├── tests/             # Unit tests
├── app.py             # Main application
└── requirements.txt   # Python dependencies
```

### Setup
1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Configure environment variables in `backend/config/`

3. Run the development server:
```bash
python backend/app.py
```

## Frontend

### Tech Stack
- Next.js 15
- React 19
- Tailwind CSS
- TypeScript

### Key Features
- Email-based authentication
- Responsive UI components
- Theme support (dark/light mode)
- Secure token management
- API request handling

### Directory Structure
```
front/
├── public/            # Static assets
├── src/
│   ├── api/           # API services
│   ├── app/           # Next.js app router
│   ├── components/    # UI components
│   ├── request/       # API request utilities
│   └── styles/        # Global styles
├── package.json       # Node.js dependencies
└── tailwind.config.ts # Tailwind configuration
```

### Setup
1. Install Node.js dependencies:
```bash
npm install
```

2. Configure environment variables in `.env.local`

3. Run the development server:
```bash
npm run dev
```

## Development Workflow

### Running Tests
- Backend tests:
```bash
cd backend
pytest
```

- Frontend linting:
```bash
cd front
npm run lint
```

### Deployment
- Backend: Use `backend/scripts/start_app.sh`
- Frontend: Build with `npm run build`

## Environment Variables

### Backend
- `FLASK_ENV`: Development/Production
- `DATABASE_URL`: Database connection string
- `SMTP_*`: SMTP server credentials

### Frontend
- `NEXT_PUBLIC_API_URL`: Backend API endpoint
- `NEXT_PUBLIC_TOKEN_SECRET`: Token encryption key

## 操作手册

### 数据库管理脚本

#### 初始化数据库迁移
```bash
cd backend/scripts/db
./run_init_db.sh
```

#### 应用数据库迁移
```bash
cd backend/scripts/db
./run_upgrade_db.sh
```

#### 创建新的数据库迁移
```bash
cd backend/scripts/db
./run_migrate_db.sh "Your migration message"
```

### 环境管理脚本

#### 创建虚拟环境
```bash
cd backend/scripts/utils
./venv.sh create
```

#### 激活虚拟环境
```bash
cd backend/scripts/utils
./venv.sh activate
```

#### 安装依赖
```bash
cd backend/scripts/utils
./requirements.sh install
```

### 应用管理脚本

#### 启动开发服务器
```bash
cd backend/scripts
./run_app.sh
```

#### 运行测试
```bash
cd backend/scripts
./test_coverage.sh
```

### 安装脚本

#### 安装Python环境
```bash
cd backend/scripts/install
./install_python_env.sh
```

#### 安装虚拟机环境
```bash
cd backend/scripts/install
./install_vm.sh
```

### 注意事项
1. 所有脚本都需要在项目根目录下执行
2. 确保已安装所有依赖项
3. 数据库脚本需要先配置好数据库连接字符串
4. 脚本执行失败时会返回非零退出码
