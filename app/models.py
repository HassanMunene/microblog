from . import db, login_manager
from datetime import datetime, timedelta
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from . import login_manager
import hashlib

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
    profile_picture_url = db.Column(db.String(500), index=True)
    to_use_gravatar = db.Column(db.Boolean, default=False)
    is_confirmed = db.Column(db.Boolean, default=False)


    def generate_gravatar_url(self, default='identicon', rating='g'):
        """
        This function will generate avatar image links for users that
        opt to sign in to the application using email instead OAuth
        """
        url = 'https://secure.gravatar.com/avatar'
        hash = hashlib.md5(self.email.lower().encode('utf-8')).hexdigest()
        return f'{url}/{hash}?d={default}&r={rating}'
