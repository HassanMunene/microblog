from . import main
from flask import render_template, redirect, url_for, flash, request, jsonify, current_app, session
from flask import send_from_directory
from flask_login import current_user, login_required
from .forms import PostForm
from ..models import User, Post, Permission
from .. import db
import os
from PIL import Image
#PIL is Python Image Library for image processing
import base64
from io import BytesIO
import time
import uuid
import imghdr #to determine image type extension

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
    posts = Post.query.order_by(Post.timestamp.desc()).all()
    return render_template('user.html', posts=posts)

@main.route('/followers')
def followers():
    return render_template('followers.html')

#===========================================================================================================================================
#===============This route will handle uploading the image to the uploads folder incase the user writes a post with an image================
#===========================================================================================================================================
@main.route('/upload_image', methods=['POST'])
def upload_image():
    #the image url we receive is binary encoded hence we have to decode it using base64.b64decode to binary data
    imageUrl = request.form.get('image_url')
    actual_image_data = imageUrl.split(',')[1] #omit 'data:image/png;base64' part

    image_binary_data = base64.b64decode(actual_image_data)

    #after getting the binary data then we store it in-memory using BytesI0 so that we can process it.
    image = BytesIO(image_binary_data)

    image = Image.open(image)
    width = 200
    height = 200
    resized_image = image.resize((width, height))

    #then generate a unique file name for the image using timestamp and uuid
    timestamp = int(time.time())
    random_str = str(uuid.uuid4())[:4]

    # determine image extension type
    image_extension = imghdr.what(None, h=image_binary_data)
    filename = f'processed_{timestamp}_{random_str}.{image_extension}'

    #Construct the full path to save the file
    upload_folder = os.path.join(current_app.static_folder, 'uploads')
    os.makedirs(upload_folder, exist_ok=True)  # Ensure the directory exists if not then create
    full_path = os.path.join(upload_folder, filename)

    #save the processed image to uploads directory and store its filename in db
    resized_image.save(full_path)

    #store the image filename in a session so that it can persist across request to make it accessible in another route '/write'
    session['image_filename'] = filename
    print(filename)
    return jsonify({'success': True})

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
        image_filename = session.get('image_filename', None)
        print(image_filename)
        post = Post(body=text_data, title=title, topic=topic, imageName=image_filename, author=current_user._get_current_object())
        db.session.add(post)
        db.session.commit()
        return jsonify({'status': True})
    return render_template('posting_page.html')

#==========================================================================================================================================
#=This route will be used to serve static files to the client to provide a relative url to the frontend eg images stored in backend=
#==========================================================================================================================================
@main.route('/serve_image')
def serve_image():
    #will receive the request from img src with filename as the query parameter
    filename = request.args.get('filename', '')
    return send_from_directory('static/uploads', filename)

