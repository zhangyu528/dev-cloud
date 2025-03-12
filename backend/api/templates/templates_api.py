from flask_restx import Namespace, Resource, fields
from .templates import TEMPLATES
from flask_jwt_extended import jwt_required
templates_ns = Namespace('templates', description='模板管理接口', path='/api/templates')

templates_model = templates_ns.model('Templates', {
    'name': fields.String(required=True, description='模板名称'),
    'description': fields.String(description='模板描述'),
    'icon': fields.String(required=True, description='图标路径'),
    'language': fields.String(required=True, description='模板语言')
})

@templates_ns.route('/available-templates')
class TemplateList(Resource):
    @templates_ns.doc(security=['jwt'], description='获取所有可用模板')
    @templates_ns.marshal_with(templates_model, as_list=True)
    @templates_ns.response(200, '成功获取模板列表')
    @jwt_required()
    def get(self):
        """获取所有可用模板"""
        # RESTX的marshal_with会自动过滤和验证字段
        # TEMPLATES数据结构应与template_model完全匹配
        # 将 TEMPLATES 字典转换为列表形式
        templates_list = [
            {"name": name, **details} for name, details in TEMPLATES.items()
        ]
        return templates_list, 200
