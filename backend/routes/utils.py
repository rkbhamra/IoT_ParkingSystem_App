import json


def get_db(file):
    with open('databases/' + file, 'r') as f:
        return json.load(f)


def save_db(file, data):
    with open('databases/' + file, 'w') as f:
        json.dump(data, f, indent=4)