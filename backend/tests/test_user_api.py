import pytest
from datetime import datetime, timedelta, timezone
from backend.db.models import User, VerificationCode
from backend.api.status_codes import StatusCodes

class TestUser:
    @pytest.fixture(autouse=True, scope='class')
    def setup_database(self):
        from backend.extensions import db
        db.create_all()
        yield
        db.session.remove()
        db.drop_all()

    @pytest.fixture(autouse=True)
    def cleanup_test_data(self):
        yield
        from backend.extensions import db
        User.query.delete()
        VerificationCode.query.delete()
        db.session.commit()
