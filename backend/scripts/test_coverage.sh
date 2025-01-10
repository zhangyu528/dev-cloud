#!/bin/bash
# 获取脚本所在目录
SCRIPT_DIR=$(cd "$(dirname "$0")"; pwd)

source "$SCRIPT_DIR/utils/venv.sh"
source "$SCRIPT_DIR/utils/requrirements.sh"

# 项目根目录：使用 Git 获取项目的根目录
PROJECT_DIR=$(cd "$SCRIPT_DIR" && git rev-parse --show-toplevel)
echo "Project directory: $PROJECT_DIR"

export PYTHONPATH="$PROJECT_DIR"
echo "PYTHONPATH set to: $PYTHONPATH"

# 导入虚拟环境激活函数
create_venv
activate_venv

# 安装项目依赖
install_requirements

# 测试文件路径
TEST_PATH="$PROJECT_DIR/backend/tests"

# 切换到脚本所在目录（tests 文件夹）
cd "$TEST_PATH" || exit

# 运行测试文件并生成覆盖率数据
echo "Running user API tests..."
python -m coverage run -m pytest "$TEST_PATH"

# 生成终端覆盖率报告
echo "Generating coverage report..."
python -m coverage report -m

# 生成 HTML 报告
echo "Generating HTML coverage report..."
python -m coverage html -d "$TEST_PATH/htmlcov"

# 在默认浏览器中打开 HTML 报告
HTML_REPORT="$TEST_PATH/htmlcov/index.html"

if [[ "$OSTYPE" == "darwin"* ]]; then
    open "$HTML_REPORT"  # macOS
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open "$HTML_REPORT"  # Linux
elif [[ "$OSTYPE" == "cygwin" || "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    start "$HTML_REPORT"  # Windows
else
    echo "Please open the report manually: $HTML_REPORT"
fi
