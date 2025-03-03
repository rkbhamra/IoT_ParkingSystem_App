from flask import Flask
from .home import home_bp
from .login import login_bp

def create_app():
    app = Flask(__name__)
    app.register_blueprint(home_bp)
    app.register_blueprint(login_bp)
    return app