import json
import subprocess

def get_db(file):
    with open('databases/' + file, 'r') as f:
        return json.load(f)


def save_db(file, data):
    print("Saving database...")
    with open('databases/' + file, 'w') as f:
        json.dump(data, f, indent=4)


def run_file(file):
    result = subprocess.run(['python', file], capture_output=True, text=True)
    if result.returncode == 0:
        return {"status": "success", "output": result.stdout}
    else:
        return {"status": "error", "error": result.stderr}
