import React, { Component } from 'react';
import io from "socket.io-client"
import ControlButtons from './ControlButtons.js';
import Video from './Video.js'
import './App.css';

var ss = require('socket.io-stream');

class App extends Component {

    constructor(props){
        super(props);

        this.state={
            playbackVolume: .5,
            mediaCtrl: {
                paused: false,
                isOn: false,
                volume: 0
            },
            vidProps: {
                height: 1080,
                width: 1240,
                mirror: false,
            },
            appProps: {
                threshold: 0.1,
                socketUrl: "ws://dockerhost:5000",
                postUrl: "http://dockerhost:5000/image"
            },
            media: false,
            objects: false,
        };

        this.socket = io(this.state.appProps.socketUrl);
        this.stream = ss.createStream();

        window.ws = this.socket

        this.socket.on('connect', function(){
            console.log("connected");
        });
        this.socket.on('objects', (data)=>{
            this.drawBoxes(data);
            this.getObjects();
        });

        this.socket.on('message', function(info){
            console.log(info);
        });


        this.startVideo = this.startVideo.bind(this)
        this.getObjects = this.getObjects.bind(this)
        this.pauseVid = this.pauseVid.bind(this)
        this.changePlaybackVol = this.changePlaybackVol.bind(this)
        this.sendBlog = this.sendBlob.bind(this)
        this.drawBoxes = this.drawBoxes.bind(this)

        this.fr = new FileReader();

        this.startVideo()


    }

    startVideo(event){
        let currentComponent = this;
        var userMedia = navigator.mediaDevices.getUserMedia({ audio: false, video: { width: this.state.vidProps.width , height: this.state.vidProps.height} } )
        .then(function(data) {
            currentComponent.setState({media : data});
            currentComponent.setState({ mediaCtrl : { isOn: true, paused : false } });
            document.getElementById("video-stream").srcObject = data
            document.getElementById("video-stream").play()
            document.getElementById("video-stream").addEventListener("canplaythrough", function(){
                currentComponent.initCanvases()
                currentComponent.getObjects();
            });
            return data;
        })
        .catch(function(err) {
            console.log("Video not initialized", err)
            var media = false;
            return false;
        });
        let obj = this;
    }

    initCanvases(){
        this.captCanv = document.createElement("canvas");
        this.captCtx = this.captCanv.getContext("2d");
        this.vid = document.getElementById("video-stream");
    }

    pauseVid(){

    }

    drawBoxes(obj){
        // function(objects){
        //     this.setState({objects})
        // }
        var  drawCanvas = document.getElementById("object-canvas");
        if(drawCanvas !== undefined ){
            var  drawCtx = drawCanvas.getContext("2d");
            var objects = JSON.parse(obj);
            console.log(objects)
            drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height)

            //filter out objects that contain a class_name and then draw boxes and labels on each
            var currentComponent = this;

            objects.filter(object => object.class_name).forEach(object => {
                let x = object.x * drawCanvas.width;
                let y = object.y * drawCanvas.height;
                let width = (object.width * drawCanvas.width) - x;
                let height = (object.height * drawCanvas.height) - y;

                //flip the x axis if local video is mirrored
                // if (currentComponent.state.vidProps.mirror){
                //    x = drawCanvas.width - (x + width)
                // }

                drawCtx.fillText(object.class_name + " - " + Math.round(object.score * 100, 1) + "%", x + 5, y + 20);
                drawCtx.strokeRect(x, y, width, height);
            });
        }
    }

    getObjects(){
        console.log(this.captCanv);
        this.captCtx.drawImage(this.vid, 0,0, this.state.vidProps.width, this.state.vidProps.height, 0, 0, this.state.vidProps.width, this.state.vidProps.height );
        this.captCanv.toBlob(this.sendBlob(this), 'image/jpeg');
    }

    sendBlob(obj){
        let object = obj;

        return function(data){
            console.log(data);
            let formdata = new FormData();
            formdata.append("image", data);
            formdata.append("threshold", obj.state.appProps.threshold);

            let xhr = new XMLHttpRequest();
            xhr.open("POST", obj.state.appProps.postUrl, true);
            // xhr.setRequestHeader("Content-type", "multipart/form-data");
            xhr.onload = function () {
                if (this.status === 200) {
                    console.log(this.response);
                }
                else{
                    console.error(xhr);
                }
            }
            xhr.send(formdata);
        }
    }


    changePlaybackVol(vol){

        this.setState( { mediaCtrl : {volume: vol } } );
    }

    render() {
        return (
          <div className="App">
            <header className="App-header">
                By David M Noll<h1 className="App-title">Flask NN </h1>
                <ControlButtons mediaCtrl={this.state.mediaCtrl} getObjects={this.getObjects} startVideo={this.startVideo} changePlaybackVol={this.changePlaybackVol} volume=".5" />
            </header>
            <div className="App-intro">
                <Video media={this.state.media} vidProps={this.state.vidProps} objects={this.state.objects} />
            </div>
          </div>
        );
    }
}

export default App;
