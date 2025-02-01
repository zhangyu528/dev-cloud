# Frontend 快速启动指南

## 运行步骤

### 1. 安装Node.js环境（如未安装）
- 下载并安装Node.js 18+：https://nodejs.org/

### 2. 安装项目依赖（仅在首次运行时需要）
```bash
npm install
```

### 3. 运行开发服务器
```bash
npm run dev
```

## 环境变量
- `NEXT_PUBLIC_API_URL`: 后端API地址
- `NEXT_PUBLIC_ENV`: 环境变量（development|production）

## 项目结构
```
front/
├── public/          # 静态资源
├── src/             # 源代码
│   ├── app/         # Next.js页面路由
│   ├── components/  # 公共组件
│   ├── api/         # API请求封装
└── package.json     # 项目依赖
