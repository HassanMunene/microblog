from flask import current_app
from . import db, login_manager
from datetime import datetime, timedelta
from pytz import timezone
from flask_login import UserMixin, AnonymousUserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from . import login_manager
import hashlib
import random
import string

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

#=========================================================================================
# THE USER TABLE
#=========================================================================================
class User(UserMixin, db.Model):
    """
    This table will store the User
    """
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(64), unique=True, index=True, nullable=False)
    fullname = db.Column(db.String(64), nullable=False)
    #username will be automatically generated in the app to make it unique
    username = db.Column(db.String(64), unique=True)
    profile_picture_url = db.Column(db.String(500), index=True)
    location = db.Column(db.String(64))
    about_me = db.Column(db.Text())
    to_use_gravatar = db.Column(db.Boolean, default=False)
    is_confirmed = db.Column(db.Boolean, default=False)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    posts = db.relationship('Post', backref='author', lazy='dynamic')

    #This constructor is executed the moment a user a created to assing the user roles
    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)
        self.generate_username(self.fullname)
        if self.role is None:
            if self.email == current_app.config['KCAVIBES_ADMIN']:
                self.role = Role.query.filter_by(name='Admin').first()
            if self.role is None:
                self.role = Role.query.filter_by(default=True).first()

    def generate_username(self, fullname):
        #generate a random username for each user
        random_part = ''.join(random.choices(string.ascii_lowercase, k=4))
        fullname = fullname.split(' ')
        firstname = fullname[0]
        self.username = firstname+random_part

    def generate_gravatar_url(self, default='identicon', rating='g'):
        """
        This function will generate avatar image links for users that
        opt to sign in to the application using email instead OAuth
        """
        url = 'https://secure.gravatar.com/avatar'
        hash = hashlib.md5(self.email.lower().encode('utf-8')).hexdigest()
        return f'{url}/{hash}?d={default}&r={rating}'

    def __repr__(self):
        return 'user:{}, id:{}, email:{}'.format(self.username, self.id, self.email)

    #below are helper methods to check whether user has giveb permissions in roles they have been assigned
    def can(self, perm):
        return self.role is not None and self.role.has_permission(perm)
    def is_admin(self):
        return self.can(Permission.ADMIN)

#=========================================================================================
# CLASS FOR ANONYMOUS USER/USERS NOT AUTHENTICATED
#=========================================================================================
class AnonymousUser(AnonymousUserMixin):
    def can(self, perm):
        return False

    def is_admin(self):
        return False

#=========================================================================================
# CLASS WITH PERMISSIONS.
#=========================================================================================
class Permission():
    FOLLOW = 1
    COMMENT = 2
    WRITE = 4
    MODERATE = 8
    ADMIN = 16

#=========================================================================================
# THE ROLES TABLE WILL STORE THE DIFFERENT ROLES USER CAN HAVE
#=========================================================================================
class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    default = db.Column(db.Boolean, default=False, index=True)
    permissions = db.Column(db.Integer)
    users = db.relationship('User', backref='role', lazy='dynamic')

    #constructor method
    def __init__(self, **kwargs):
        super(Role, self).__init__(**kwargs)
        if self.permissions is None:
            self.permissions = 0


    # methods to manage permissions
    def add_permission(self, perm):
        if not self.has_permission(perm):
            self.permissions += perm

    def remove_permission(self, perm):
        if self.has_permission(perm):
            self.permissions -= perm

    def reset_permissions(self):
        self.permissions = 0

    def has_permission(self, perm):
        # This func uses bitwise & operator
        return self.permissions & perm == perm

    @staticmethod
    def insert_roles():
        # This fun insert roles and permissions automatically to the roles database table
        roles = {
            'User': [Permission.FOLLOW, Permission.COMMENT, Permission.WRITE],
            'Moderator': [Permission.FOLLOW, Permission.COMMENT, Permission.WRITE, Permission.MODERATE],
            'Admin': [Permission.FOLLOW, Permission.COMMENT, Permission.WRITE, Permission.MODERATE, Permission.ADMIN]
        }
        default_role = 'User'
        for r in roles:
            role = Role.query.filter_by(name=r).first()
            if role is None:
                role = Role(name=r)
            role.reset_permissions()
            for perm in roles[r]:
                role.add_permission(perm)
            role.default = (role.name == default_role)
            db.session.add(role)
        db.session.commit()

    def __repr__(self):
        return 'role:{}, id:{}, permissions:{}'.format(self.name, self.id, self.permissions)

#================================================================================================================
# THE POSTS TABLE. HANDLE STORING POSTS MADE BY USERS
#================================================================================================================
def get_unique_timestamp():
    return datetime.now(timezone('Africa/Nairobi'))

class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, index=True, default=get_unique_timestamp)
    title = db.Column(db.String(256))
    topic = db.Column(db.String(128))
    imageName = db.Column(db.String(128))
    uniquePostId = db.Column(db.String(255))
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
