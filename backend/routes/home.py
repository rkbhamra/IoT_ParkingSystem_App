from flask import Blueprint, jsonify

home_bp = Blueprint('home', __name__)

@home_bp.route('/post', methods=['POST'])
def post():
    return jsonify({'message': 'post home test'})
