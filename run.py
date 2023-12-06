import os
from app import create_app, db
from app.models import User, Role, Permission
from flask_migrate import Migrate

app = create_app(os.getenv('FLASK_CONFIG') or 'default')
migrate = Migrate(app, db)

@app.shell_context_processor
def make_shell_context():
    return dict(db=db, User=User, Role=Role, Permission=Permission)

#def start_ngrok():
#from pyngrok import ngrok
    #url = ngrok.connect(5000)
    #print(f'Ngrok Tunnel url: {url}')

# This line below ensures that ngrok runs on parent process in debug mode
# so that it can be automatically restarted too

#if os.environ.get('WERKZEUG_RUN_MAIN') != 'true':
    #start_ngrok()
