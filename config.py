import os
import datetime

class Config:
    GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_SECRET')
    OAUTHLIB_INSECURE_TRANSPORT=os.environ.get('OAUTHLIB_INSECURE_TRANSPORT')
    SECRET_KEY = os.environ.get('SECRET_KEY') # this should match with the secret key from google client.json
    MAIL_SERVER = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
    MAIL_PORT = int(os.environ.get('MAIL_PORT', '587'))
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS', 'true').lower() in ['true', 'on', '1']
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME') or 'awanzihassan@gmail.com'
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD') or 'xuhhwjkcsscxdmms'
    MAIL_SUBJECT_PREFIX = '[KcaVibes]'
    MAIL_SENDER = 'KcaVibes Admin <awanzihassan@gmial.com>'
    KcaVibes_ADMIN = os.environ.get('KcaVibes_ADMIN', 'sultanhamud019@gmail.com')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    FLASK_DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEVELOPMENT_DATABASE_URI')

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('TESTING_DATABASE_URI')

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get('PRODUCTION_DATABASE_URI')


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
