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
