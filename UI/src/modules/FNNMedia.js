import io from "socket.io-client"


class FNNMedia {

    constructor(){
        this.ws = io('ws://dockerhost:5000');
        this.media = navigator.mediaDevices.getUserMedia({ audio: true, video: { width: 1024 , height: 768} } )
        .then(function(stream) {
            return stream;
        })
        .catch(function(err) {
            console.log("Video not initialized", err)
            return false;
        });
        console.log(this.media);
        this.ws.on('connect', function(){
            console.log("connected");
        });
        this.ws.on('event', function(info){
            console.log(info);
        });

        this.ws.on('message', function(info){
            console.log(info);
        });

        this.ws.send("messageTest");

    }
    start(socket, stream){

    }

    socketOpen(){
        if (this.ws){
        }else{
            console.log(this.ws);
        }
    }



  }
  export default FNNMedia;
