from flask import Flask
from routes.parking import parking_bp
from routes.user import user_bp

app = Flask(__name__)
app.register_blueprint(parking_bp, url_prefix='/parking')
app.register_blueprint(user_bp, url_prefix='/user')


if __name__ == '__main__':
    app.run(host='192.168.2.48', port=5000, debug=True)
