from flask import render_template
from . import app

@app.route('/')
@app.route('/index')
def index():
    user = {'username': 'Hassan'}
    posts = [
        {
            'author': {'username': 'John'},
            'body': 'Beautiful day in Nairobi'
        },
        {
            'author': {'username': 'Susan'},
            'body': 'The avengers movie was so good'
        }
    ]
    return render_template('index.html', user=user, title='Intro', posts=posts)
