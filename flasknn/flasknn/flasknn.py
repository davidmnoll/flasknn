from flask import Flask, render_template, request
from flask_socketio import SocketIO, send, emit
from flask_cors import CORS, cross_origin
from .obj_det import Obj_Detector
from .handle_ws import WS_Handler
from threading import Thread
import eventlet
eventlet.monkey_patch()

import json

app = Flask(__name__)
cors = CORS(app)
socketio = SocketIO(app, binary=True, logger=True)

# streamSocket = SocketIO(app=app, channel='file', binary=True, logger=True)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = 'secret!'

def runApp():
    socketio.run(app, host="0.0.0.0" )



@cross_origin()
@app.route("/")
def hello():
    return "Hello Worldt"

@cross_origin()
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST') # Put any other methods you need here
    return response

@app.after_request
@cross_origin()
@app.route("/image", methods=['POST'])
def image(param):
    try:
        print('received image')
        print(request.form)
        image_file = request.files['image']  # get the image
        # Set an image confidence threshold value to limit returned data
        threshold = request.form.get('threshold')


        od = Obj_Detector(image_file, threshold, socketio)
        # thread = Thread(target = od.det_obj)
        # thread.start()
        od.det_obj()
        return "success"

    except Exception as e:
        print('POST /image error: '+ str(e))
        return e




@cross_origin()
@socketio.on('message')
def handle_message(message=None, other=None):
    print('received message: ' + str( message ) )
    send('test message')

@cross_origin()
@socketio.on('connect')
def handle_my_custom_event(json=None):
    print('connected')




@cross_origin()
@socketio.on('$stream')
def handle_file(message=None, other=None, another=None):
    """Connect event."""
    print('stream start')
    print(str(message))
    print(str(other))
    print(str(another))
    send('gotstream')
