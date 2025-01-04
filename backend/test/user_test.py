# backend/tests/test_user.py
import pytest
# User model is required for database schema creation
from backend.db.models import User
from backend.api.status_codes import StatusCodes

class TestUser:
    @pytest.fixture(autouse=True, scope='class')
    def setup_database(self):
        """Fixture to set up and tear down the test database.
        Runs once for the entire test class."""
        from backend.extensions import db
        db.create_all()  # This needs User model to create user table
        yield
        db.session.remove()
        db.drop_all()

    @pytest.fixture(autouse=True, scope='function')  # 显式声明 function scope
    def cleanup_test_data(self):
        """Clean up test data after each test function"""
        yield
        from backend.extensions import db
        # 清理测试用户数据
        User.query.delete()
        db.session.commit()

    def test_user_registration(self, client):
        """测试用户注册"""
        response = self._create_test_user(
            client, 
            username='testuser',
            email='test@example.com',
            password='strongpassword123'
        )
        assert response.status_code == StatusCodes.USER['USER_REGISTRATION_SUCCESS']['status_code']
        assert response.json.get('message') == StatusCodes.USER['USER_REGISTRATION_SUCCESS']['message']

    def test_duplicate_username_registration(self, client):
        """测试重复用户名注册"""
        # 先创建第一个用户
        self._create_test_user(
            client,
            username='duplicateuser',
            email='first@example.com',
            password='strongpassword123'
        )
        
        # 尝试创建重复用户
        response = self._create_test_user(
            client,
            username='duplicateuser',
            email='second@example.com',
            password='anotherpassword456'
        )
        assert response.status_code == StatusCodes.USER['USERNAME_ALREADY_EXISTS']['status_code']

    def test_user_login(self, client):
        """测试用户登录"""
        # 先创建用户
        self._create_test_user(
            client,
            username='loginuser',
            email='login@example.com',
            password='loginpassword123'
        )

        login_data = {
            'username': 'loginuser',
            'password': 'loginpassword123'
        }
        response = client.post('/api/login', json=login_data)
        assert response.status_code == StatusCodes.USER['USER_LOGIN_SUCCESS']['status_code']
        assert response.json.get('message').encode('utf-8') in response.data

    def test_invalid_login(self, client):
        """测试无效登录"""
        login_data = {
            'username': 'nonexistentuser',
            'password': 'wrongpassword'
        }
        response = client.post('/api/login', json=login_data)
        
        assert response.status_code == StatusCodes.USER['INVALID_CREDENTIALS']['status_code']
        assert response.json.get('message').encode('utf-8') in response.data

    def test_user_logout(self, client):
        """测试用户登出"""
        # 先创建并登录用户
        self._create_test_user(
            client,
            username='logoutuser',
            email='logout@example.com',
            password='logoutpassword123'
        )

        login_data = {
            'username': 'logoutuser',
            'password': 'logoutpassword123'
        }
        login_response = client.post('/api/login', json=login_data)
        access_token = login_response.json.get('access_token')

        # 使用登录令牌进行登出
        headers = {
            'Authorization': f'Bearer {access_token}'
        }
        logout_response = client.post('/api/logout', headers=headers)
        assert logout_response.status_code == StatusCodes.USER['USER_LOGOUT_SUCCESS']['status_code']
        assert logout_response.json.get('message') == StatusCodes.USER['USER_LOGOUT_SUCCESS']['message']

    def _create_test_user(self, client, username, email, password):
        """辅助方法：创建测试用户"""
        registration_data = {
            'username': username,
            'email': email,
            'password': password
        }
        return client.post('/api/register', json=registration_data)