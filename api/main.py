from flask import Flask
import json
app = Flask(__name__)

j = json.loads('{"one" : "1", "two" : "2", "three" : "3"}')

@app.route('/')
def hello_world():
    return json.dumps(j)