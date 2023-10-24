from . import auth
from flask import render_template, redirect, flash, url_for, request, jsonify
from .forms import RegistrationForm, LoginForm

@auth.route('/register', methods=['GET', 'POST'])
def register():
    email = request.form.get('email')
    #process email save on db or send emails
    return jsonify({'message': 'email submitted succesfully'})

@auth.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        flash('You have been logged in!', 'success')
        return redirect(url_for('main.home'))
    return render_template('authentication/login.html', form=form)
