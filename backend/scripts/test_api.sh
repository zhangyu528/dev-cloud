#!/bin/bash

# 脚本出错时立即退出
set -e

# 检测虚拟环境 Python 解释器
if [ ! -d "venv" ]; then
    echo "Virtual environment not found. Creating..."
    python -m venv venv
fi

# 激活虚拟环境
if [ -f "venv/bin/activate" ]; then
    # Unix/Linux 路径
    source venv/bin/activate
elif [ -f "venv/Scripts/activate" ]; then
    # Windows 路径
    source venv/Scripts/activate
else
    echo "Failed to activate virtual environment."
    exit 1
fi

# 运行特定的测试文件
echo "Running user API tests..."
python -m pytest backend/test/user_test.py -v

# 可选：生成测试覆盖率报告
echo "Generating test coverage report..."
export COVERAGE_FILE=backend/test/.coverage
python -m coverage run -m pytest backend/test/user_test.py
python -m coverage report -m

# 生成 HTML 报告并在默认浏览器中打开
python -m coverage html -d backend/test/htmlcov
start backend/test/htmlcov/index.html