"""
The module that will initialzie this app package
"""
from flask import Flask

app = Flask(__name__)

from app import route
