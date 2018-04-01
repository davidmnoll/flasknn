Flask NN
=============


A Dockerized backend for TensorFlow's object detection module served with Flask.

A frontend in React using WebRTC to capture user video posts it to the backend, and receives object labels via websockets.  

To run:
--edit URL's in UI/src/App.js

`yarn install `
--in root directory: `docker-compose up`
--in another terminal in UI dir: `yarn start`


Big thank you to the walk-throughs below

* https://webrtchacks.com/webrtc-cv-tensorflow/
* https://medium.com/@evheniybystrov/tensorflow-object-detection-with-docker-from-scratch-5e015b639b0b
* https://github.com/runozo/flask-socketio-video-stream
* https://stackoverflow.com/questions/27050108/convert-numpy-type-to-python/27050186#27050186
* https://github.com/tensorflow/models/tree/master/research/object_detection
