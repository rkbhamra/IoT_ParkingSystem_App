import datetime
from flask import Blueprint, jsonify
import pytz
from . import utils

user_bp = Blueprint('user', __name__)


def get_surge_pricing():
    reservations = utils.get_db('reservations.json')
    count = 0
    timezone = pytz.timezone('Canada/Eastern')
    current_time = datetime.datetime.now(timezone)

    for spot_reservations in reservations.values():
        for r in spot_reservations:
            reservation_time = timezone.localize(datetime.datetime.strptime(r['time'], '%Y-%m-%d %H:%M'))
            if reservation_time <= current_time <= reservation_time + datetime.timedelta(minutes=30):
                count += 1

    print('Surge reservations:')
    print(count)
    return 2



@user_bp.route('/login/<username>/<password>', methods=['GET'])
def login(username, password):
    users = utils.get_db('users.json')
    if username not in users or users[username]['password'] != password:
        return jsonify({'message': 'Username not found/Incorrect password', 'success': False})
    return jsonify({'message': 'Login successful', 'success': True})
    

@user_bp.route('/signup/<username>/<password>', methods=['GET'])
def signup(username, password):
    users = utils.get_db('users.json')
    if username in users:
        return jsonify({'message': 'Username already exists', 'success': False})
    
    users[username] = {'password': password, 'reservations': []}
    utils.save_db('users.json', users)
    return jsonify({'message': 'Signup successful', 'success': True})


@user_bp.route('/<username>', methods=['GET'])
def get_user(username):
    users = utils.get_db('users.json')
    if username not in users:
        return jsonify({'message': 'Username not found', 'success': False})
    
    timezone = pytz.timezone('Canada/Eastern')
    current_time = datetime.datetime.now(timezone)
    is_changed = False

    reservations = users[username]['reservations']
    for i, r in enumerate(reservations[:]):
        reservation_time = timezone.localize(datetime.datetime.strptime(r['time'], '%Y-%m-%d %H:%M'))
        print(r)
        if current_time > reservation_time + datetime.timedelta(minutes=30):
            is_changed = True
            reservations.remove(r)
        elif reservation_time <= current_time <= reservation_time + datetime.timedelta(minutes=30) and 'cost' not in r:
            is_changed = True
            # surge pricing
            users[username]['reservations'][i]['cost'] = get_surge_pricing()
                    
    if is_changed:
        users[username]['reservations'] = reservations
        utils.save_db('users.json', users)
    return jsonify(users[username])
