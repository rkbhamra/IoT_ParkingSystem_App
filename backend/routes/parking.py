import datetime
import json
from flask import Blueprint, jsonify, request
from . import utils
from . import iot
import pytz

parking_bp = Blueprint('parking', __name__)
parking = utils.get_db('parking.json')
reservations = utils.get_db('reservations.json')


def update_parking():
    global parking, reservations
    data = iot.get_variables()

    timezone = pytz.timezone('Canada/Eastern')
    current_time = datetime.datetime.now(timezone)

    for spot, lst in reservations.items():
        for r in lst[:]:
            reservation_time = timezone.localize(datetime.datetime.strptime(r['time'], '%Y-%m-%d %H:%M'))
            if reservation_time <= current_time <= reservation_time + datetime.timedelta(minutes=30):
                parking[spot]['status'] = 'reserved'
                parking[spot]['time'] = (reservation_time + datetime.timedelta(minutes=30)).strftime('%Y-%m-%d %H:%M')
            elif current_time > reservation_time + datetime.timedelta(minutes=30):
                lst.remove(r)
    
    for k, v in data.items():
        if parking[k]['status'] != 'reserved' or not v['free']:
            parking[k]['status'] = ('free' if v['free'] else 'occupied')
        if parking[k]['status'] == 'reserved':
            t = timezone.localize(datetime.datetime.strptime(parking[k]['time'], '%Y-%m-%d %H:%M'))
            if t < current_time:
                parking[k]['status'] = 'free'
                parking[k]['time'] = ''


@parking_bp.route('/test', methods=['GET'])
def get_iot():
    global parking
    update_parking()
    return jsonify(parking)


@parking_bp.route('/reserve/<spot>', methods=['GET'])
def get_reservations(spot):
    global reservations
    return jsonify(reservations[spot])


@parking_bp.route('/reserve/<spot>', methods=['POST'])
def reserve_spot(spot):
    global parking, reservations
    userdb = utils.get_db('users.json')

    req = json.loads(request.data)
    time = req.get('time')
    make = req.get('make')
    plate = req.get('plate')
    user = req.get('user')

    reservations[spot].append({
        'time': time,
        'make': make,
        'plate': plate,
        'user': user
    })

    userdb[user]['reservations'].append({
        'spot': spot,
        'time': time,
        'make': make,
        'plate': plate
    })
    
    update_parking()
    utils.save_db('users.json', userdb)
    utils.save_db('parking.json', parking)
    utils.save_db('reservations.json', reservations)
    return jsonify({'status': 'success'})


@parking_bp.route('/save', methods=['GET'])
def update():
    global parking, reservations
    utils.save_db('parking.json', parking)
    utils.save_db('reservations.json', reservations)
    return jsonify({'status': 'success'})


@parking_bp.route('reserve/<username>/<spot>/<time>', methods=['DELETE'])
def remove_reservation(username, spot, time):
    users = utils.get_db('users.json')
    global reservations
    global parking
    
    re = users[username]['reservations']
    for r in re:
        if r['time'] == time:
            re.remove(r)
            break
    users[username]['reservations'] = re

    end_time = datetime.datetime.strptime(time, '%Y-%m-%d %H:%M') + datetime.timedelta(minutes=30)
    if parking[spot]['status'] == 'reserved' and parking[spot]['time'] == end_time.strftime('%Y-%m-%d %H:%M'):
        parking[spot]['status'] = 'free'
        parking[spot]['time'] = ''
    
    for r in reservations[spot]:
        if r['time'] == time:
            reservations[spot].remove(r)
            break
            
    utils.save_db('parking.json', parking)
    utils.save_db('reservations.json', reservations)
    utils.save_db('users.json', users)
    return jsonify({'message': 'Reservation removed', 'success': True})