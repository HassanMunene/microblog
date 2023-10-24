from flask import Flask, request

app = Flask(__name__)
app.config['SECRET_KEY'] = 'dont tell anyone'

@app.route('/')
def index():
    return "<h1> name : {}</h1>".format(request.args.get('name', 'stranger'))

if __name__ == "__main__":
    app.run(debug=True)
