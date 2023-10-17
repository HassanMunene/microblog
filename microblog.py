from flask import Flask, render_template

app = Flask(__name__)

posts = [
    {
        'title': 'Blog post 1',
        'author': 'Hassan Munene',
        'date': 'Oct 2023 17',
        'content': 'First blog post'
    },
    {
        'title': 'Blog post 2',
        'author': 'Munene Awanzi',
        'date': 'Oct 2023 16',
        'content': 'pre first blog post'
    }
]

@app.route('/')
@app.route('/home')
def home():
    return render_template('home.html', posts=posts)

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True)
