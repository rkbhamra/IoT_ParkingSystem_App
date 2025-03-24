import json
from flask import Blueprint, jsonify
from . import utils
from . import iot

parking_bp = Blueprint('parking', __name__)
parking = utils.get_db('parking.json')

@parking_bp.route('/test', methods=['GET'])
def get_iot():
    data = iot.get_variables()
    is_changed = False

    for k, v in data.items():
        if parking[k]['status'] != 'reserved' or v['free']:
            if parking[k]['status'] != ('free' if v['free'] else 'occupied'):
                is_changed = True
            parking[k]['status'] = ('free' if v['free'] else 'occupied')
            
    # if is_changed:
    #     utils.save_db('parking.json', parking)
    
    return jsonify(parking)
