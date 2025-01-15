import pytest
from flask import url_for
from backend.api.auth.github_auth_api import github_auth_bp

@pytest.fixture
def client(app):
    app.register_blueprint(github_auth_bp)
    return app.test_client()

def test_github_auth_redirect(client):
    response = client.get(url_for('github_auth_bp.github_login'))
    assert response.status_code == 302
    assert 'github.com' in response.location

def test_github_callback(client):
    with client.application.app_context():
        # 使用 url_for 获取回调 URL
        callback_url = url_for('github_auth_bp.github_callback', code='test_code')
        response = client.get(callback_url)
        assert response.status_code == 200
        assert 'access_token' in response.json
