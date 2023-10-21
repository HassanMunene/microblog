from flask import Flask, redirect, flash, url_for, render_template
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SECRET_KEY']= 'my boy benzi'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://hassan:munene14347@localhost/microblog'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from . import routes

