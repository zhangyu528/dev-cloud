from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from backend.extensions import db
from backend.db.models import User
from . import api_bp

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
        return jsonify({"error": "Username already exists"}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400

    new_user = User(username=username, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@api_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)
        return jsonify({"access_token": access_token}), 200
    
    return jsonify({"error": "Invalid credentials"}), 401

@api_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # In JWT, logout is typically handled client-side by removing the token
    return jsonify({"message": "Logged out successfully"}), 200