from . import auth
from flask import render_template, redirect, flash, url_for, request, jsonify, current_app
from .forms import RegistrationForm, LoginForm
from ..models import User
from .. import db
from ..emails import send_email
import random
from datetime import datetime, timedelta
from ..tokens import generate_setup_token, generate_sign_in_token
import jwt


@auth.route('/submit_email', methods=['GET', 'POST'])
def submit_email():
    """
    Handle the email sent by XMLHttpRequest from client and then
    send verification to the email address provided
    """
    email = request.form.get('email')
    user = User.query.filter_by(email=email).first()
    if user:
        # means the user already exists in the database and so send an email for sign in instead
        # also send back a response to javascript so that it can know which modal to display for sign or create account
        sign_in_token = generate_sign_in_token(email)
        send_email(email, 'Sign in to KcaVibes', 'authentication/email/sign_in', sign_in_token=sign_in_token)
        return jsonify({'email_known': True}) # to tell js that user already exist for some response there
    else:
        user1 = User(email=email)
        db.session.add(user1)
        db.session.commit()
        setup_token = generate_setup_token(email)
        send_email(email, 'Finishing creating your account on KcaVibes', 'authentication/email/setup', setup_token=setup_token)
        return jsonify({'email_known': False, 'token': setup_token}) # to tell js that user did not exist previously

    #send_email(email, 'Get started with KcaVibes', 'authentication/email/confirm', verification_code=verification_code)


@auth.route('/register', methods=['GET', 'POST'])
def register():
    """
    will handle creating the account for the user to finish the account setup
    """
    form = RegistrationForm()
    setup_token = request.args.get('setup_token')

    if setup_token:
        # means the setup_token query parameter is available
        payload = jwt.decode(setup_token, current_app.config['SECRET_KEY'], algorithms=['HS256'])

        # check if token has expired
        if datetime.utcnow() > datetime.fromisoformat(payload['expiration']):
            return redirect(url_for('auth.request_setup_link'))

        email = payload['email']
        user = User.query.filter_by(email=email).first()
        if user:
            form.email.data = email
            if form.validate_on_submit():
                user.username = form.username.data
                user.is_confirmed = True
                db.session.add(user)
                db.session.commit()
                return redirect(url_for('auth.login'))
            return render_template('authentication/register.html', form=form, email=email)

        else:
            # user not found
            return redirect(url_for('auth.request_setup_link'))

    # no setup_token in query parameter
    return redirect(url_for('auth.request_setup_link'))

@auth.route('/request_setup_link', methods=['GET', 'POST'])
def request_setup_link():
    return '<h1>YOOOOOO set up link</h1>'

@auth.route('/login', methods=['GET', 'POST'])
def login():
    return '<h1>We are almost there</h1>'
