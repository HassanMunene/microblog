from . import auth
from flask import render_template, redirect, flash, url_for, request, jsonify
from .forms import RegistrationForm, LoginForm
from ..models import User
from .. import db
from ..emails import send_email
import random


@auth.route('/submit_email', methods=['GET', 'POST'])
def submit_email():
    """
    Handle the email sent by js XMLHttpRequest from client and then
    send verification to the email address provided
    """
    email = request.form.get('email')
    verification_code = str(random.randint(1000, 9999))
    send_email(email, 'Get started with KcaVibes', 'authentication/email/confirm', verification_code=verification_code)
    return jsonify({'success':True, 'message': 'email submitted succesfully'})


@auth.route('/register', methods=['GET', 'POST'])
def register():
    return render_template('register.html')

@auth.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        flash('You have been logged in!', 'success')
        return redirect(url_for('main.home'))
    return render_template('authentication/login.html', form=form)
