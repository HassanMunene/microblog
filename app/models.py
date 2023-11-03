from . import db, login_manager
from datetime import datetime, timedelta
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from . import login_manager

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

class User(UserMixin, db.Model):
    """
    This table will store the User
    """
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(64), unique=True, index=True, nullable=False)
    username = db.Column(db.String(64), nullable=True)
    is_confirmed = db.Column(db.Boolean, default=False)
