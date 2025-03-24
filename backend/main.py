from flask import Flask
from flask_cors import CORS
from routes.parking import parking_bp
from routes.user import user_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(parking_bp, url_prefix='/parking')
app.register_blueprint(user_bp, url_prefix='/user')

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
