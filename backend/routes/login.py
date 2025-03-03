from flask import Blueprint, jsonify

home_bp = Blueprint('login', __name__)

@home_bp.route('/post', methods=['POST'])
def post():
    return jsonify({'message': 'post login test'})