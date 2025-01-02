# backend/tests/test_user.py
import pytest
from flask import json
from backend.api.user import register, login, logout
from backend.db.models import User

def test_user_registration(client):
    """测试用户注册"""
    # 准备测试数据
    registration_data = {
        'username': 'testuser',
        'email': 'test@example.com',
        'password': 'strongpassword123'
    }

    # 发送注册请求
    response = client.post('/api/register', 
                           data=json.dumps(registration_data), 
                           content_type='application/json')
    
    # 验证注册成功
    assert response.status_code == 201
    assert b"User registered successfully" in response.data

    # 验证用户已在数据库中
    user = User.query.filter_by(username='testuser').first()
    assert user is not None
    assert user.email == 'test@example.com'

def test_duplicate_username_registration(client):
    """测试重复用户名注册"""
    # 先注册一个用户
    registration_data = {
        'username': 'duplicateuser',
        'email': 'first@example.com',
        'password': 'strongpassword123'
    }
    client.post('/api/register', 
                data=json.dumps(registration_data), 
                content_type='application/json')

    # 尝试使用相同用户名再次注册
    duplicate_data = {
        'username': 'duplicateuser',
        'email': 'second@example.com',
        'password': 'anotherpassword456'
    }
    response = client.post('/api/register', 
                           data=json.dumps(duplicate_data), 
                           content_type='application/json')
    
    # 验证注册失败
    assert response.status_code == 400
    assert b"Username already exists" in response.data

def test_user_login(client):
    """测试用户登录"""
    # 先注册一个用户
    registration_data = {
        'username': 'loginuser',
        'email': 'login@example.com',
        'password': 'loginpassword123'
    }
    client.post('/api/register', 
                data=json.dumps(registration_data), 
                content_type='application/json')

    # 尝试登录
    login_data = {
        'username': 'loginuser',
        'password': 'loginpassword123'
    }
    response = client.post('/api/login', 
                           data=json.dumps(login_data), 
                           content_type='application/json')
    
    # 验证登录成功
    assert response.status_code == 200
    assert b"access_token" in response.data

def test_invalid_login(client):
    """测试无效登录"""
    # 尝试使用不存在的用户登录
    login_data = {
        'username': 'nonexistentuser',
        'password': 'wrongpassword'
    }
    response = client.post('/api/login', 
                           data=json.dumps(login_data), 
                           content_type='application/json')
    
    # 验证登录失败
    assert response.status_code == 401
    assert b"Invalid credentials" in response.data