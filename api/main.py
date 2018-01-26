from flask import Flask
import json
import time
import copy
import arcpy

app = Flask(__name__)

j = json.load(open('options.json'))

@app.route('/')
def hello_world():
    pivots = copy.deepcopy(j)
    for pivot in pivots:
        # Calculate new angle
        rate = pivot["rate"]
        angle = (pivot["angle"] + (round(time.time())%360)*3 ) % 360
        pivot["angle"] = angle
    return json.dumps(pivots)