import React, { Component } from "react"
import "./Video.css"

class Video extends Component {

    constructor(props){
        super(props);


    }

    render(){

        return(
            <div id="video">
                <video id="video-stream" className="stream" width={this.props.vidProps.width} height={this.props.vidProps.height} style={{width: this.props.vidProps.width, height:this.props.vidProps.height}} autoPlay></video>
                <canvas id="object-canvas" width={this.props.vidProps.width} height={this.props.vidProps.height} style={{width: this.props.vidProps.width, height:this.props.vidProps.height}}></canvas>
            </div>
        )

    }

}
export default Video
