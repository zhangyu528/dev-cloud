from flask_restx import Namespace, Resource, fields
from .templates import TEMPLATES
from flask_jwt_extended import jwt_required
templates_ns = Namespace('templates', description='模板管理接口', path='/api/templates')

template_model = templates_ns.model('Template', {
    'name': fields.String(required=True, description='模板名称'),
    'description': fields.String(description='模板描述'),
    'icon': fields.String(required=True, description='图标路径')
})

@templates_ns.route('/available-templates')
class TemplateList(Resource):
    @templates_ns.doc(security=['jwt'], description='获取所有可用模板')
    @templates_ns.marshal_with(template_model, as_list=True)
    @templates_ns.response(200, '成功获取模板列表')
    @jwt_required()
    def get(self):
        """获取所有可用模板"""
        # RESTX的marshal_with会自动过滤和验证字段
        # TEMPLATES数据结构应与template_model完全匹配
        return TEMPLATES, 200
