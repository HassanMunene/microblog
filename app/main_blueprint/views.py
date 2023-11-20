from . import main
from flask import render_template, redirect, url_for, flash, request, jsonify
from flask_login import current_user, login_required
from .forms import PostForm
from ..models import User, Post, Permission
from .. import db


#==========================================================================================================================================
#=================================This is the home page that will handle both authenticated and not authenticated users===================
#==========================================================================================================================================
@main.route('/')
def home():
    """
    This is the first route that the users see when they open the application
    """
    posts = Post.query.order_by(Post.timestamp.desc()).all()
    if current_user.is_authenticated:
        print (current_user.username)
        print (current_user.profile_picture_url)
        #print(posts)
        return render_template('authenticated_home.html', posts=posts)
    return render_template('home.html', posts=posts)

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

@main.app_errorhandler(403)
def forbidden(e):
    return 'dude we will work on this page to look good but still you are forbidden'

#===========================================================================================================================================
#=================This is the route that will handle the user profile=======================================================================
#===========================================================================================================================================
@main.route('/user/<username>')
def user(username):
    return render_template('user.html')

@main.route('/followers')
def followers():
    return render_template('followers.html')


#============================================================================================================================================
#==============This 'WRITE' route will handle when users write a post and send it to backend using js fetch api==============================
#============================================================================================================================================
@main.route('/write', methods=['GET', 'POST'])
def write():
    header = request.headers.get('Content-Type')
    if header:
        print(header)
        data = request.get_json()
        text_data = data.get('textData', '')
        title = data.get('title', '')
        topic = data.get('topic', '')
        post = Post(body=text_data, title=title, topic=topic, author=current_user._get_current_object())
        db.session.add(post)
        db.session.commit()
        return jsonify({'status': True})
    return render_template('posting_page.html')
