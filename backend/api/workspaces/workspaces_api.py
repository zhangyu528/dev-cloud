
from flask import request
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.workspace import Workspace
from extensions import db
from flask import current_app
from workspace_mng.workspace_manager import WorkspaceManager

import logging
logger = logging.getLogger(__name__)

workspace_ns = Namespace('workspaces', description='工作区管理接口', path='/api/workspaces')

create_req_model = workspace_ns.model('CreateRequest', {
    'name': fields.String(required=True, description='工作区名称'),
    'template': fields.String(required=True, description='工作区模板'),
})
@workspace_ns.route('/create')
class WorkspaceCreate(Resource):
    @workspace_ns.doc(security=['jwt'], description='创建工作区')
    @workspace_ns.expect(create_req_model)
    @workspace_ns.response(200, '创建成功')
    @jwt_required()
    def post(self):
        """创建工作区"""
        try:
            # RESTX的marshal_with会自动过滤和验证字段
            # workspace数据结构应与workspace_model完全匹配
            workspace = Workspace()
            workspace.name = request.json['name']
            workspace.template = request.json['template']
            workspace.owner_id = get_jwt_identity()
            db.session.add(workspace)
        
            workspace_manager = WorkspaceManager(namespace="flask-dev-cloud-server")
            workspace_manager.create_workspace(workspace.name, workspace.template)
            db.session.commit()
        except Exception as e:
            logger.error(f"Failed to create workspace: {str(e)}")
            db.session.rollback()
            return {"message": "Failed to create workspace"}, 500
        return {"message": "Workspace created successfully"}, 200


list_workspace_resp_model = workspace_ns.model('Workspace', {
    'id': fields.String(required=True, description='工作区ID'),
    'name': fields.String(required=True, description='工作区名称'),
    'template': fields.String(required=True, description='工作区模板'),
})
@workspace_ns.route('/list')
class WorkspaceList(Resource):
    @workspace_ns.doc(security=['jwt'], description='获取工作区列表')
    @workspace_ns.marshal_with(list_workspace_resp_model, as_list=True)
    @jwt_required()
    def get(self):
        """获取工作区列表"""
        try:
            workspaces = Workspace.query.filter_by(owner_id=get_jwt_identity()).all()
        except Exception as e:
            logger.error(f"Failed to get workspaces: {str(e)}")
            return {"message": "Failed to get workspaces"}, 500
        return workspaces, 200

delete_workspace_req_model = workspace_ns.model('DeleteRequest', {
    'id': fields.Integer(required=True, description='工作区ID'),
})
@workspace_ns.route('/delete')
class DeleteWorkspace(Resource):
    @workspace_ns.doc(security=['jwt'], description='删除工作区')
    @workspace_ns.expect(delete_workspace_req_model)
    @workspace_ns.response(200, '删除成功')
    @jwt_required()
    def post(self):
        """删除工作区"""
        workspace_id = request.json['id']
        try:
            workspace = Workspace.query.get_or_404(workspace_id)
            if workspace.owner_id != get_jwt_identity():
                return {"message": "Unauthorized"}, 401

            #删除workspace
            workspace_manager = WorkspaceManager(namespace="flask-dev-cloud-server")
            workspace_manager.delete_workspace(workspace.name)
            # 删除工作区记录
            db.session.delete(workspace)
            db.session.commit()
        except Exception as e:
            logger.warning(e)
            db.session.rollback()
            return {"message": "Failed to delete workspace"}, 500
        return {"message": "Workspace deleted successfully"}, 200

from kubernetes_mng.kubernetes_pod_tracker import KubernetesPodTracker
@workspace_ns.route('/track/<string:workspace_name>')
class WorkspaceTracking(Resource):
    def get(self, workspace_name):
        try:
            # 创建并启动 Pod 追踪器
            pod_tracker = KubernetesPodTracker(
                app=current_app,  # 使用传入的 Flask 应用实例
                namespace="flask-dev-cloud-server", 
                workspace_name=workspace_name
            )
            pod_tracker.start()

            return {
                'message': 'Pod tracking started', 
                'workspace_name': workspace_name
            }, 200

        except Exception as e:
            logger.error(f"Pod tracking error: {e}")
            return {
                'message': 'Failed to start pod tracking', 
            }, 500