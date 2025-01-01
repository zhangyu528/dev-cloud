# scripts/start_flask.sh

#!/bin/bash

# 激活虚拟环境 (如果你使用虚拟环境的话)
if [ -f ".venv/bin/activate" ]; then
    source .venv/bin/activate
else
    echo "Virtual environment not found, skipping activation."
fi

# 导入项目环境变量，如果需要的话
export FLASK_APP=app.py
export FLASK_ENV=development  # 或者设置为 'production'

# 安装依赖，如果没有安装过依赖的话
echo "Installing dependencies..."
pip install -r backend/requirements.txt

# 启动 Flask 服务
echo "Starting Flask server..."
python backend/app.py  # 这里可以调用你之前在 app.py 里的启动逻辑

# 如果你使用 Gunicorn 或其他生产环境的服务器来运行应用，可以替换成如下命令：
# gunicorn --workers 4 --bind 0.0.0.0:5000 app:app

