from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from config import Config

# Initialize Flask
app = Flask(__name__)
app.config.from_object(Config)

# Initialize Database & Marshmallow
db = SQLAlchemy(app)
ma = Marshmallow(app)

# Import routes (register them)
from app.routes import api
app.register_blueprint(api)

# Create Database Tables
with app.app_context():
    db.create_all()
