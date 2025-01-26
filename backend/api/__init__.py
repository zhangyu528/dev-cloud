from .user import user_ns
from .verify import verify_ns
from .templates import templates_ns
from .auth import github_ns

def register_namespaces(api):
    """注册所有API命名空间"""    
    api.add_namespace(github_ns)
    api.add_namespace(templates_ns)
    api.add_namespace(user_ns)
    api.add_namespace(verify_ns)