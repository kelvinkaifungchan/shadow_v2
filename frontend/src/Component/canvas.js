import React from 'react';
import io from 'socket.io-client';
import FormData from 'form-data';

import { v4 as uuidv4 } from 'uuid';
import { submitCanvas } from "../Redux/actions/canvasAction";
import { connect } from "react-redux";


class PureCanvas extends React.Component{

    timeout;

    ctx;
    isDrawing = false;

constructor(props){
    super(props); 
    
    if(this.props.userId){
        console.log("USER ID", this.props.userId)
        console.log("CANVASID", this.props.dictationId)
        this.room = this.props.userId + "-" + this.props.dictationId
    } else{
        console.log("USER ID in params", this.props.match.params.userId)
        console.log("CANVASID in params", this.props.match.params.canvasId)
        this.room = this.props.match.params.userId.toString() + "-" + this.props.match.params.canvasId.toString();
    }
  
    console.log("ROOM ID", this.room)
  
    this.socket = io.connect("http://localhost:8080");
    this.socket.emit("newUser", this.room)
    this.socket.on("clear", () => {
        console.log("Receiving clear event")
        var canvas = document.querySelector('#board');
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    this.socket.on("canvas-data", function (data) {
        console.log("Receiving canvas data")
        var root = this;
        var interval = setInterval(function () {
            if (root.isDrawing) return;
            root.isDrawing = true;
            clearInterval(interval);
            var image = new Image();
            var canvas = document.querySelector('#board');
            var ctx = canvas.getContext('2d');
            image.onload = function () {
                ctx.drawImage(image, 0, 0);

                root.isDrawing = false;
            };
            image.src = data;
        }, 10)
    })

}

    // componentDidUpdate(){
    //     console.log("UPDATE")
    //     this.socket.disconnect()
    //     this.socket = io.connect("http://localhost:8080");
    //     if(this.props.questionId === undefined){
    //         this.room = this.props.userId + "-" + this.props.dictationId+ "-" + 1
    //     } else{
    //         this.room = this.props.userId + "-" + this.props.dictationId +"-" + this.props.questionId
    //     }
        
    //     console.log("NEW ROOM ID", this.room)
    //     this.socket.emit("newUser", this.room)
    //     this.drawOnCanvas();
    // }

componentDidMount() {
    this.drawOnCanvas();
    // this.ctx.strokeStyle = "#00000";
    // this.ctx.lineWidth = "1";
}


drawOnCanvas() {
    console.log("NEW ROOM DRAW", this.room)
    var room = this.room;
    var canvas = document.querySelector('#board');
    this.ctx = canvas.getContext('2d');
    var ctx = this.ctx;
    
    var sketch = document.querySelector('#sketch');
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue('width'));
    canvas.height = parseInt(sketch_style.getPropertyValue('height'));
    var drawing = false;
    var current = {}
    

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mouseout', onMouseUp, false);
    canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

    //Touch support for mobile devices
    canvas.addEventListener('touchstart', onMouseDown, false);
    canvas.addEventListener('touchend', onMouseUp, false);
    canvas.addEventListener('touchcancel', onMouseUp, false);
    canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);

    function onMouseDown(e) {
        console.log("FUCK YOUR MOM MOUSEDOWN")
        e.preventDefault();
        e.stopPropagation();
        drawing = true;
        current.x = e.offsetX || e.touches[0].clientX;
        current.y = e.offsetY || e.touches[0].clientY;
    }

    function onMouseUp(e) {
        console.log("YESSSSS MOUSEUP ")
        if (!drawing) { return; }
        drawing = false;
        
       // drawLine(current.x, current.y, e.offsetX || e.touches[0].clientX, e.offsetY || e.touches[0].clientY, current.color, true);
    }
  

    function onMouseMove(e) {
        console.log('FUCK ME DADDY MOUSEMOVE') 
        e.preventDefault();
        e.stopPropagation();

        if (!drawing) { return; }
        drawLine(current.x, current.y, e.offsetX || e.touches[0].clientX, e.offsetY || e.touches[0].clientY, current.color, true);
        current.x = e.offsetX || e.touches[0].clientX;
        current.y = e.offsetY || e.touches[0].clientY;
    }
    function throttle(callback, delay) {
        var previousCall = new Date().getTime();
        return function () {
            var time = new Date().getTime();

            if ((time - previousCall) >= delay) {
                previousCall = time;
                callback.apply(null, arguments);
            }
        };
    }

    var root = this;
    //onPaint
    var drawLine = function (x0, y0, x1, y1) {
        
        console.log("FUCK YEA DRAWING")
        console.log(x0, y0, x1, y1)
        
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
        ctx.closePath();

       
        var base64ImageData = canvas.toDataURL("image/png");
        // console.log(base64ImageData)
        root.socket.emit("canvas-data", room, base64ImageData);

    };


}
clearcanvas() {
    console.log("CLEAR ")
    var canvas = document.querySelector('#board');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var base64ImageData = canvas.toDataURL("image/png");
    this.socket.emit("clear", this.room, base64ImageData);
}

submit(){
    var canvas = document.querySelector('#board');
    var base64ImageData = canvas.toDataURL("image/png");
    
    //console.log(base64ImageData)

    const dataURLtoFile = (dataurl) => {
        let fileName = uuidv4();
        const arr = dataurl.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const bstr = Buffer.from(arr[1], 'base64').toString('utf-8')
        //console.log(bstr)
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n) {
          u8arr[n - 1] = bstr.charCodeAt(n - 1)
          n -= 1 // to make eslint happy
        }
        return new File([u8arr], fileName, { type: mime })
      }

      
      // generate file from base64 string
      const file = dataURLtoFile(`data:image/png;base64,${base64ImageData}`)
      // put file into form data
      const data = new FormData()
      data.append('img', file, file.name)

      //put fileName up to ViewDicationQuestion
      this.props.handleCanvas(file.name);
      this.props.addSubmission();
      //call the action to dispatch the action and post the canvas data to database
      this.props.submitMDP(data)
      
      
}


render() {
    return (
        <div>
            <div className="sketch" id="sketch">
                <canvas style={{ position: "relative", width: 950, height: 480 }} className="board" id="board" ></canvas>
            </div>
            <button onClick={() => this.clearcanvas()}> Clear </button>
            <button onClick={() => this.submit()}> Submit </button>
        </div>
    )
}

}


const mapDispatchToProps = (dispatch) => {
    return{
        submitMDP: (data) => {
            dispatch(submitCanvas(data))
        }
      
    }
}



export const Canvas = connect(null, mapDispatchToProps)(PureCanvas)