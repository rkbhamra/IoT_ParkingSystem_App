from flask import Blueprint, jsonify
from . import utils

user_bp = Blueprint('user', __name__)


@user_bp.route('/login/<username>/<password>', methods=['GET'])
def login(username, password):
    users = utils.get_db('users.json')
    print(users, username, password)
    if username not in users or users[username]['password'] != password:
        return jsonify({'message': 'Username not found/Incorrect password', 'success': False})
    return jsonify({'message': 'Login successful', 'success': True})
    

@user_bp.route('/signup/<username>/<password>', methods=['GET'])
def signup(username, password):
    users = utils.get_db('users.json')
    if username in users:
        return jsonify({'message': 'Username already exists', 'success': False})
    
    users[username] = {'password': password}
    utils.save_db('users.json', users)
    return jsonify({'message': 'Signup successful', 'success': True})
