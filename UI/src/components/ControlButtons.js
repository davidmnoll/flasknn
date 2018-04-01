import React, { Component } from "react"

class ControlButtons extends Component {



    changeVol(event){
        console.log(event)
        var volume = document.getElementById("volume");
        var currentVal = volume.value;
        this.props.changePlaybackVol(currentVal)
    }

    render(){
        if(this.props.mediaCtrl.isOn === true ){

            return(
                <div className="control-buttons">
                    <button id="get-objects" onClick={this.props.getObjects}>GetObjects</button>
                    <button id="pause" onClick={this.props.pauseVid}>Pause</button>



                    <p>Volume</p>
                    <input id="volume" type="range" min="0" max="1" step="0.01" defaultValue="0.5"  onChange={this.changeVol.bind(this)} />
                </div>
            )
        }else{
            return(
                <div className="control-buttons">
                    <p>Start Video</p>
                    <button id="start-button" onClick={this.props.startVideo}>Start</button>
                </div>
            )
        }

    }

}
export default ControlButtons
