from flask import render_template
from . import app

@app.route('/')
@app.route('/index')
def index():
    title = 'Intro'
    user = {'username': 'Hassan'}
    return render_template('index.html', user=user, title=title)
