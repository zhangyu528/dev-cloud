
from flask import request
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.workspace import Workspace
from extensions import db
from flask import current_app

workspace_ns = Namespace('workspaces', description='工作区管理接口', path='/api/workspaces')
create_request_model = workspace_ns.model('CreateRequest', {
    'name': fields.String(required=True, description='工作区名称'),
    'template': fields.String(description='工作区模板'),
})

@workspace_ns.route('/create')
class WorkspaceCreate(Resource):
    @workspace_ns.doc(security=['jwt'], description='创建工作区')
    @workspace_ns.expect(create_request_model)
    @workspace_ns.response(200, '创建成功')
    @jwt_required()
    def post(self):
        """创建工作区"""
        # RESTX的marshal_with会自动过滤和验证字段
        # workspace数据结构应与workspace_model完全匹配
        workspace = Workspace()
        workspace.name = request.json['name']
        workspace.template = request.json['template']
        workspace.owner_id = get_jwt_identity()
        db.session.add(workspace)
        db.session.commit()
        
        # 调用docker service运行容器
        from container.container_service import create_container
        try:
            create_container(workspace.name, workspace.template)
        except Exception as e:
            current_app.logger.error(f"Failed to start docker container: {str(e)}")
            return {"message": "Workspace created but failed to start container"}, 201
            
        return {"message": "Workspace created and container started successfully"}, 200

workspace_model = workspace_ns.model('Workspace', {
    'id': fields.String(description='工作区ID'),
    'name': fields.String(required=True, description='工作区名称'),
    'template': fields.String(description='工作区模板'),
})
@workspace_ns.route('/list')
class WorkspaceList(Resource):
    @workspace_ns.doc(security=['jwt'], description='获取工作区列表')
    @workspace_ns.marshal_with(workspace_model, as_list=True)
    @jwt_required()
    def get(self):
        """获取工作区列表"""
        try:
            workspaces = Workspace.query.filter_by(owner_id=get_jwt_identity()).all()
        except Exception as e:
            current_app.logger.warn(e)
            return "fefefef", 500
        return workspaces
