from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User

# 初始化API命名空间
user_ns = Namespace('user', description='用户相关操作', path='/api/user')

# 响应模型定义
user_model = user_ns.model('User', {
    'id': fields.String(description='用户ID'),
    'username': fields.String(required=True, description='用户名'),
    'email': fields.String(required=True, description='邮箱'),
    'is_active': fields.Boolean(description='激活状态'),
    'created_at': fields.DateTime(description='创建时间'),
    'avatar_url': fields.String(description='头像地址')
})

    # 注意：这里只需要定义需要暴露的字段
    # 数据库中的敏感字段（如password_hash）不会通过此模型暴露

@user_ns.route('/me')
class CurrentUser(Resource):
    @user_ns.doc(security=['jwt'], description='获取当前登录用户信息')
    @user_ns.marshal_with(user_model)
    @user_ns.response(200, '成功', user_model)
    @user_ns.response(401, '无效令牌')
    @user_ns.response(404, '用户不存在')
    @jwt_required()
    def get(self):
        """获取当前用户详细信息"""
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            user_ns.abort(404, "用户不存在")
            
        # 使用安全的数据转换方法
        return {
            'id': str(user.id),
            'username': user.username,
            'email': user.email,
            'is_active': user.is_active,
            'created_at': user.created_at.isoformat(),
            'avatar_url': user.avatar_url or ''
        }, 200


@user_ns.route('/verify-token')
class TokenVerification(Resource):
    @user_ns.doc(security=['jwt'], description='验证JWT令牌有效性')
    @user_ns.response(200, '验证成功')
    @user_ns.response(401, '无效令牌')
    @jwt_required()
    def post(self):
        """验证JWT令牌有效性"""
        # JWT装饰器已自动完成令牌验证
        # 有效令牌才会进入该方法，直接返回验证成功
        return None, 200


@user_ns.route('/logout')
class UserLogout(Resource):
    @user_ns.doc(security=['jwt'], description='用户注销接口')
    @user_ns.response(200, '注销成功')
    @user_ns.response(401, '无效令牌')
    @jwt_required()
    def post(self):
        """处理用户注销请求
        (依赖JWT自动验证机制，无需手动检查令牌有效性)
        """
        # 框架已通过@jwt_required()自动验证令牌有效性
        # 直接返回成功响应，前端应清除本地存储的令牌
        return None, 200
