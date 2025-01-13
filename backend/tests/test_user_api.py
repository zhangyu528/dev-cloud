import pytest
from datetime import datetime, timedelta, timezone
from models.user import User
from models.verification_code import VerificationCode

class TestUser:
    @pytest.fixture(autouse=True, scope='class')
    def setup_database(self):
        from extensions import db
        db.create_all()
        yield
        db.session.remove()
        db.drop_all()

    @pytest.fixture(autouse=True)
    def cleanup_test_data(self):
        yield
        from extensions import db
        User.query.delete()
        VerificationCode.query.delete()
        db.session.commit()

    def test_logout_unauthorized(self, client):
        """Test logout without JWT token"""
        response = client.post('/api/logout')
        # Expect 401 Unauthorized since JWT is required
        assert response.status_code == 401

    def test_logout_success(self, client, jwt_token):
        """Test successful logout with valid JWT"""
        headers = {
            'Authorization': f'Bearer {jwt_token}'
        }
        response = client.post('/api/logout', headers=headers)
        assert response.status_code == 200
