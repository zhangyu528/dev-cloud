from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import os

from backend.extensions import db
from backend.db.models import User
from . import api_bp
from .status_codes import get_status_response

@api_bp.route('/register', methods=['POST'])
def register():
    """
    用户注册接口
    ---
    tags:
      - 用户管理
    summary: 用户注册
    description: 创建新用户账号
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          properties:
            username:
              type: string
              description: 用户名
              example: "johndoe"
            email:
              type: string
              description: 电子邮箱
              example: "johndoe@example.com"
            password:
              type: string
              description: 密码
              example: "securepassword123"
    responses:
      201:
        description: 用户注册成功
        schema:
          type: object
          properties:
            message:
              type: string
              example: "User registered successfully"
      400:
        description: 注册失败（用户名或邮箱已存在）
        schema:
          type: object
          properties:
            error:
              type: string
              example: "Username already exists"
    """
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(username=username).first():
        response, status_code = get_status_response('USER', 'USERNAME_ALREADY_EXISTS')
        return jsonify(response), status_code
    
    if User.query.filter_by(email=email).first():
        response, status_code = get_status_response('USER', 'EMAIL_ALREADY_EXISTS')
        return jsonify(response), status_code

    new_user = User(username=username, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    response, status_code = get_status_response('USER', 'USER_REGISTRATION_SUCCESS')
    return jsonify(response), status_code

@api_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)
        response, status_code = get_status_response('USER', 'USER_LOGIN_SUCCESS')
        response['access_token'] = access_token
        return jsonify(response), status_code
    response, status_code = get_status_response('USER', 'INVALID_CREDENTIALS')
    return jsonify(response), status_code

@api_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # In JWT, logout is typically handled client-side by removing the token
    response, status_code = get_status_response('USER', 'USER_LOGOUT_SUCCESS')
    return jsonify(response), status_code