import os
import requests
import pathlib
from . import auth
from flask import render_template, redirect, flash, url_for, request, jsonify, current_app, abort, session
from flask import make_response
from .forms import RegistrationForm, LoginForm
from ..models import User
from .. import db, oauth
from ..emails import send_email
import random
from datetime import datetime, timedelta
from ..tokens import generate_setup_token, generate_sign_in_token
import jwt
from flask_login import login_user, logout_user, current_user, login_required


#===========================================================================================
# Google authentication process coming up using OAuth2.0
#===========================================================================================

#-------set up some configuration parameters for OAuth2 client and register them with OAuth library-----"""
appConfig = {
    "OAUTH2_CLIENT_ID": os.environ.get("GOOGLE_OAUTH_CLIENT_ID"),
    "OAUTH2_CLIENT_SECRET": os.environ.get("GOOGLE_OAUTH_CLIENT_SECRET"),
    "OAUTH2_META_URL": "https://accounts.google.com/.well-known/openid-configuration",
    "FLASK_SECRET": os.environ.get("SECRET_KEY"),
    "FLASK_PORT": 5000
}

oauth.register("kcavibes",
               client_id=appConfig.get("OAUTH2_CLIENT_ID"),
               client_secret=appConfig.get("OAUTH2_CLIENT_SECRET"),
               server_metadata_url=appConfig.get("OAUTH2_META_URL"),
               client_kwargs={"scope": "openid profile email"}
               )

@auth.route('/login')
def login():
    """
    This func will initiate the OAuth2.0 authentication process, it will contact the authorization server in this case google
    services and request an authorization_url and a state which is a unique value to prevent csrf
    """
    return oauth.kcavibes.authorize_redirect(redirect_uri=url_for("auth.callback_from_oauth", _external=True))

@auth.route('/callback_from_oauth')
def callback_from_oauth():
    """
    This is where the user is redirected to when they are logged in and authorised by google
    After google successfully logs in and grants authorization, Google's server redirects the user back
    to your application with an authorization code as a query parameter in the URL.
    This URL is known as the "authorization callback URL.
    """
    token = oauth.kcavibes.authorize_access_token()
    user_info = token.get('userinfo')
    email = user_info.get('email')
    name = user_info.get('name')
    picture = user_info.get('picture')
    #print("email:{} name:{} picture:{}".format(email, name, picture))
    user = User.query.filter_by(email=email).first()
    if user:
        login_user(user, remember=True)
    else:
        user = User(email=email, fullname=name, profile_picture_url=picture, is_confirmed=1)
        db.session.add(user)
        db.session.commit()
        login_user(user, remember=True)
    return redirect(url_for('main.home'))

#==========================================================================================
# END OF GOOGLE OAUTH2.0 PROCESS
#==========================================================================================

#=========================================================================================
# ROUTE THAT WILL REGISTER THE USER WHEN THEY SIGNUP WITH EMAIL AND PASSWORD
#=========================================================================================
@auth.route('/register_user', methods=['GET', 'POST'])
def register_user():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        email = request.json.get('email')
        fullname = request.json.get('fullname')
        #print(fullname)
        password = request.json.get('password')
        user1 = User(
            email=email,
            fullname=fullname,
            password=password,
            gravatar=email,
        )
        db.session.add(user1)
        db.session.commit()
        # after this use the email the user provided to send a veification code
        signUp_code = random.randint(10000, 99999)
        signUp_code_str = str(signUp_code)
        session['verificationCode'] = signUp_code_str
        #print(session.get('verificationCode'))

        send_email(email, 'sign up to kcavibes', 'authentication/email/signup_code', signUp_code_str=signUp_code_str)
        return jsonify({'email_sent': True})
    else:
        return jsonify({'email_sent': False})

#=========================================================================================
# VERIFY THAT THE EMAIL DOES NOT ALREADY EXIST WHEN THE USER IS REGISTERING
#=========================================================================================
@auth.route('/verify_email', methods=['POST', 'GET'])
def verify_email():
    received_email = request.json.get('email')
    print(received_email)
    user = User.query.filter_by(email=received_email).first()
    if user:
        return jsonify({'email_available': True})
    else:
        return jsonify({'email_available': False})

#=========================================================================================
# ROUTE THAT WILL REGISTER THE USER WHEN THEY SIGNUP WITH EMAIL AND PASSWORD
#=========================================================================================
@auth.route('/verify_code', methods=['POST', 'GET'])
def verify_code():
    """
    verify the verifiction code entered by the user to the one stored in the session earlier
    """
    received_code = request.json.get('code')
    session_code = session.get('verificationCode')
    if (received_code == session_code):
        return jsonify({'validity': True})
    return jsonify({'validity': False})

#=========================================================================================
# THIS ROUTE WILL BE DISPLAYED TO SIGNIFY THE LOADING EFFECT
#=========================================================================================
@auth.route('/loading')
def loading():
    session.pop('verificationCode', None)
    return render_template('loading.html')







#=========================================================================================
# ROUTE THAT WILL RECEIVE EMAIL ENTER BY USER DURING NORMAL AUTHENTICATION
#=========================================================================================
@auth.route('/receive_email_from_modal', methods=['GET', 'POST'])
def receive_email_from_modal():
    """
    Handle the email sent by XMLHttpRequest from client and then
    send verification to the email address provided. from the email, the app
    will know if the user is indeed in the application or not
    """
    email = request.form.get('email')
    print(request.form)
    user = User.query.filter_by(email=email).first()
    if user:
        # means the user already exists in the database and so send an email for sign in instead
        # also send back a response to javascript so that it can know which modal to display for sign or create account
        sign_in_token = generate_sign_in_token(email)
        send_email(email, 'Sign in to KcaVibes', 'authentication/email/sign_in', sign_in_token=sign_in_token)
        return jsonify({'email_known': True}) # to tell js that user already exist for some response there
    else:
        #user1 = User(email=email)
        #db.session.add(user1)
        #db.session.commit()
        setup_token = generate_setup_token(email)
        send_email(email, 'Finishing creating your account on KcaVibes', 'authentication/email/setup_account', setup_token=setup_token)
        return jsonify({'email_known': False}) # to tell js that user did not exist previously


#============================================================================================
# IF USER OPTS TO USER EMAIL FOR AUTH THEN THIS ROUTE WILL HANDLE SETTIGN UP THEIR ACCOUNT
#============================================================================================
@auth.route('/setup_account', methods=['GET', 'POST'])
def setup_account():
    """
    will handle creating the account for the user to finish the account setup
    """
    form = RegistrationForm()
    # access the setup token from query parameter so that you can authenticate the email from the user
    # and also verify that the token has not expired yet.
    setup_token = request.args.get('setup_token')

    if setup_token:
        # means the setup_token query parameter is available
        payload = jwt.decode(setup_token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        # check if token has expired
        if datetime.utcnow() > datetime.fromisoformat(payload['expiration']):
            return redirect(url_for('auth.request_setup_link', message='token_expired'))
        email = payload['email']
        form.email.data = email
        if form.validate_on_submit():
            user = User(email=email, fullname=form.username.data, is_confirmed=True, to_use_gravatar=True)
            db.session.add(user)
            db.session.commit()
            #we the log in the user to the application
            login_user(user, True)
            next = request.args.get('next')
            if next is None or not next.startswith('/'):
                next = url_for('main.home')
                return redirect(next)
        return render_template('authentication/register.html', form=form, email=email)
    # no setup_token in query parameter
    return redirect(url_for('auth.request_setup_link', message='no_token'))


#==========================================================================================
# WILL SIGN IN THE USER USING THE NORMAL METHOD OF AUTHORIZATION
#==========================================================================================

@auth.route('/sign_in_to_application', methods=["GET", "POST"])
def sign_in_to_application():
    """
    handle the link from the email sent for signing in to application
    """
    sign_in_token = request.args.get('sign_in_token')

    if sign_in_token:
        payload = jwt.decode(sign_in_token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        # check if the token has expired and if so redirect user to a page to resend the email
        if datetime.utcnow() > datetime.fromisoformat(payload['expiration']):
            return redirect(url_for('auth.request_sign_in_link', message='sign_in_token_expired'))

        email = payload['email']
        user = User.query.filter_by(email=email).first()
        if user:
            login_user(user)
            next = request.args.get('next')
            if next is None or not next.startswith('/'):
                next = url_for('main.home')
                return redirect(next)
        return redirect(url_for('main.page_not_found'))
    return redirect(url_for('auth.request_sign_in_token', message='no_token_for_authentication'))


#=================================================================================================
# WHEN JWT TOKEN FOR SET UP EXPIRES THIS IS THE ROUTE THAT WILL HANDLE SENDING OTHER EMAIL LINKS
#=================================================================================================
@auth.route('/request_setup_link', methods=['GET', 'POST'])
def request_setup_link():
    """
    This route handles the following situations
    1. where the the setup token has expired
    2. user not found meaning you not in the system
    3. your link does not have any token
    """
    if request.method == 'POST':
        email = request.form.get('email')
        setup_token = generate_setup_token(email)
        send_email(email, 'Create an account with us.', 'authentication/email/setup_account', setup_token=setup_token)
        return render_template('authentication/confirm_email_sent_again.html', email=email)
    else:
        message = request.args.get('message')
    return render_template('authentication/request_setup_link.html', message='Your set up link has expired')


#================================================================================================
# WHEN JWT TOKEN FOR SIGN IN EXPIRES THIS WILL HANDLE THAT AND SEND ANOTHER SIGN LINK
#===============================================================================================
@auth.route('/request_sign_in_link', methods=['GET','POST'])
def request_sign_in_link():
    """
    Handle the situation where the token has expired for the sign in link
    """
    if request.method == 'POST':
        email = request.form.get('email')
        sign_in_token = generate_sign_
    return 'we are coming here to request sign in link again after token has expired'

#==================================================================================================
# THE LOGOUT ROUTE HERE IT IS
#==================================================================================================
@auth.route('/logout')
@login_required
def logout():
    if current_user.is_authenticated:
        logout_user()

    return redirect(url_for('main.home'))

#===================================================================================================
# THE SIGIN ROUTE IS HERE.
#===================================================================================================
@auth.route('/signin')
def signin():
    """
    This is the route that will handle a situation where the user tries to acess a restricted site
    """
    response = make_response(render_template('home.html'))
    response.headers['Js-Show-Sign-In-Modal'] = 'show'
    return response

@auth.route('/testing')
@login_required
def testing():
    return 'mean you have already singed in'
