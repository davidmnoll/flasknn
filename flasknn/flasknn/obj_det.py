import os
from flask_socketio import SocketIO, send, emit
from PIL import Image
import numpy as np
from .demo import load_image_into_numpy_array, get_objects

class Obj_Detector():

    def __init__(self, image_file, threshold, socket):
        self.socket =  socket
        if threshold is None:
            self.threshold = 0.5
        else:
            self.threshold = float(threshold)

        self.png = Image.open(image_file)

    def det_obj(self):
        self.objects = get_objects(self.png, self.threshold)
        self.socket.emit("objects", self.objects)
