from flask import Flask
import json
app = Flask(__name__)

j = json.load(open('options.json'))

@app.route('/')
def hello_world():
    return json.dumps(j)