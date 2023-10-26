from . import auth
from flask import render_template, redirect, flash, url_for, request, jsonify
from .forms import RegistrationForm, LoginForm
from ..models import User, VerificationCode
from .. import db
from ..emails import send_email
import random
from datetime import datetime, timedelta


@auth.route('/submit_email', methods=['GET', 'POST'])
def submit_email():
    """
    Handle the email sent by js XMLHttpRequest from client and then
    send verification to the email address provided
    """
    email = request.form.get('email')
    verification_code = str(random.randint(1000, 9999))
    expiration_time = datetime.utcnow() + timedelta(minutes=15)

    verification = VerificationCode(code=verification_code, expiration_time=expiration_time)
    db.session.add(verification)
    db.session.commit()
    send_email(email, 'Get started with KcaVibes', 'authentication/email/confirm', verification_code=verification_code)
    return jsonify({'success':True, 'message': 'email submitted succesfully'})

@auth.route('/verify_code', methods=['GET', 'POST'])
def verify_code():
    """
    verify the email by verifying the code provided by the user. If the code is same as the
    one stored in the database then the email is valid
    """
    data = request.get_json()
    user_code = data.get('code')
    verification = VerificationCode.query.filter_by(code=user_code).first()

    if verification and verification.expiration_time >= datetime.utcnow():
        # means the code the user sent is valid and not yet expired.
        # delete the code from the db
        db.session.delete(verification)
        db.session.commit()
        return jsonify({'success': True, 'message': 'code verified successfully'})
    else:
        return jsonify({'success': False, 'message': 'Invalid verification code', 'code': user_code})


@auth.route('/register', methods=['GET', 'POST'])
def register():
    return render_template('authentication/register.html')

@auth.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        flash('You have been logged in!', 'success')
        return redirect(url_for('main.home'))
    return render_template('authentication/login.html', form=form)
