from flask import Flask, render_template
from flask_mail import Mail
from flask_moment import Moment
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from config import config
from authlib.integrations.flask_client import OAuth
from datetime import timedelta


mail = Mail()
moment = Moment()
db = SQLAlchemy()
login_manager = LoginManager()
login_manager.login_view = 'auth.signin'
#telling flask to use the custom anonymous user weve defined in User model
from .models import AnonymousUser
login_manager.anonymous_user = AnonymousUser
oauth = OAuth()

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    app.config['REMEMBER_COOKIE_DURATION'] = timedelta(days=30)
    app.config['UPLOAD_IMAGE_FOLDER'] = 'static/uploads'
    config[config_name].init_app(app)
    mail.init_app(app)
    moment.init_app(app)
    db.init_app(app)
    login_manager.init_app(app)
    oauth.init_app(app)

    # register blueprints
    from .main_blueprint import main as main_blueprint
    app.register_blueprint(main_blueprint)

    from .authentication_blueprint import auth as auth_blueprint
    app.register_blueprint(auth_blueprint, url_prefix='/auth')

    return app
