from flask import Blueprint, jsonify
from . import utils

parking_bp = Blueprint('parking', __name__)

@parking_bp.route('/get', methods=['GET'])
def get():
    utils.run_file("backend\\routes\\getData.py")
    return utils.get_db("backend\\databases\\lot_data.json")

