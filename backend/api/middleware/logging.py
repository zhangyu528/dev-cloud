from flask import request

def init_request_logging(app):
    @app.after_request
    def log_request_and_response(response):
        # 尝试从 JSON 响应中提取 msg
        if response.is_json:
            data = response.get_json()
            msg = data.get("message", "No message found")
        else:
            msg = "Response is not JSON"
        
        # 记录日志
        app.logger.info(
            f"URL: {request.url} | Status Code: {response.status_code} | Msg: {msg}"
        )
