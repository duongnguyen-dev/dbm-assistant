import yaml
import json

def load_config(file: str):
    with open(file, "r") as f:
        data = yaml.safe_load(f)
    return data

def save_to_json(data, filename):
    with open(filename, "w") as f:
        json.dump(data, f, indent=4)
