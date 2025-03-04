from flask import Blueprint, jsonify

parking_bp = Blueprint('parking', __name__)


@parking_bp.route('/get', methods=['GET'])
def get():
    return jsonify({'message': 'get parking test'})
