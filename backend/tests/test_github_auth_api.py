import pytest
from flask import url_for

def test_github_auth_redirect(client):
    response = client.get(url_for('github_auth_bp.github_login'))
    assert response.status_code == 302
    assert 'github.com' in response.location

def test_github_exchange(client):
    """测试GitHub OAuth回调流程"""
    with client.application.app_context():
        # 模拟GitHub回调URL，包含授权码
        callback_url = url_for('github_auth_bp.github_exchange', _external=False)
        callback_url_with_code = f"{callback_url}?code=test_code"
        
        # 发送请求
        response = client.get(callback_url_with_code)
        
        # 验证响应
        assert response.status_code == 302, "应该返回302重定向"
        assert 'token=' in response.location, "重定向URL应该包含token参数"
        assert 'http://localhost:3000/login' in response.location, "应该重定向到前端登录页面"
