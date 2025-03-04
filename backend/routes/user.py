from flask import Blueprint, jsonify

user_bp = Blueprint('login', __name__)


@user_bp.route('/get', methods=['GET'])
def get():
    return jsonify({'message': 'get user test'})