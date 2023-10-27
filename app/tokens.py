"""
This is the module where we will be manufacturing tokens to be used for various security reasons
"""
import jwt
from datetime import datetime, timedelta
from flask import current_app

# define token expiration time

def generate_setup_token(email):
    """
    This token will be sent to new users via email to set up their accounts
    """
    payload = {
        'email': email,
        'expiration': datetime.utcnow() + timedelta(hours=1)
    }
    # then covert the expiration value to a string for json serialization
    payload['expiration'] = payload['expiration'].isoformat()

    token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')
    return token
