from . import main
from flask import render_template, redirect, url_for, flash
from flask_login import current_user, login_required

@main.route('/')
def home():
    """
    This is the first route that the users see when they open the application
    """
    if current_user.is_authenticated:
        print (current_user.username)
        print (current_user.profile_picture_url)
        return render_template('authenticated_home.html')
    return render_template('home.html')

@main.route('/about')
def about():
    return render_template('about.html')

@main.route('/kcavibes-terms-of service')
def terms_of_service():
    return render_template('terms_of_service.html')

@main.app_errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@main.app_errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500
