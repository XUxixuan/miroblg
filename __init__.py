from flask import Flask

__author__ = 'John'

app = Flask(__name__)
app.config.from_object('Config')

