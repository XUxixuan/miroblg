from flask import Flask

app = Flask(__name__)
app.config.from_object('config')

from app import login
from app import forms
from app import sql
from app import SendEmail