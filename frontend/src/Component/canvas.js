import React from 'react';
import io from 'socket.io-client';
import FormData from 'form-data';


import { submitCanvas } from "../Redux/actions/canvasAction";
import { connect } from "react-redux";


class PureCanvas extends React.Component{

    timeout;

    ctx;
    isDrawing = false;

constructor(props){
    super(props);

    this.socket = io.connect("http://localhost:8080");


    this.socket.on("clear", () => {
        var canvas = document.querySelector('#board');
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    this.socket.on("canvas-data", function (data) {

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

componentDidMount() {
    this.drawOnCanvas();
    this.ctx.strokeStyle = "#00000";
    this.ctx.lineWidth = "1";
}

// componentWillReceiveProps(newProps) {
//     this.ctx.strokeStyle = newProps.color;
//     this.ctx.lineWidth = "5";
// }

drawOnCanvas() {
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
        drawing = true;
        current.x = e.clientX || e.touches[0].clientX;
        current.y = e.clientY || e.touches[0].clientY;
    }

    function onMouseUp(e) {
        console.log("YESSSSS MOUSEUP ")
        if (!drawing) { return; }
        drawing = false;
        drawLine(current.x, current.y, e.clientX || e.touches.clientX, e.clientY || e.touches.clientY, current.color, true);
    }

    function onMouseMove(e) {
        console.log('FUCK ME DADDY MOUSEMOVE')

        if (!drawing) { return; }
        drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, true);
        current.x = e.clientX || e.touches[0].clientX;
        current.y = e.clientY || e.touches[0].clientY;
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
        console.log(ctx.strokeStyle)
        console.log(ctx.lineWidth)
        console.log(x0, y0, x1, y1)
        
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
        ctx.closePath();

       
        var base64ImageData = canvas.toDataURL("image/png");
        console.log(base64ImageData)
        root.socket.emit("canvas-data", base64ImageData);

    };


}
clearcanvas() {
    console.log("CLEAR ")
    var canvas = document.querySelector('#board');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var base64ImageData = canvas.toDataURL("image/png");
    this.socket.emit("clear", base64ImageData);
}

submit(){
    console.log("HELLO")
    var canvas = document.querySelector('#board');
    var ctx = canvas.getContext('2d');
    var base64ImageData = canvas.toDataURL("image/png");
    //console.log(base64ImageData)

    const dataURLtoFile = (dataurl, filename) => {
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
        return new File([u8arr], filename, { type: mime })
      }
      
      // generate file from base64 string
      const file = dataURLtoFile(`data:image/png;base64,${base64ImageData}`)
      // put file into form data
      const data = new FormData()
      data.append('img', file, file.name)

      //call the action to dispatch the action and post the canvas data to database
      this.props.submitMDP(data)
      
      // now upload (this is gonna be in the action creator)
}


render() {
    return (
        <div>
            <div className="sketch" id="sketch">

                <canvas className="board" id="board"></canvas>

            </div>
            <button onClick={() => this.clearcanvas()}> Clear </button>
            <button onClick={() => this.submit()}> Submit </button>
        </div>
    )
}

}


const mapDispatchToProps = (dispatch) => {
    return{
        submitMDP: (data) => dispatch(submitCanvas(data))
    }
}



export const Canvas = connect(null, mapDispatchToProps)(PureCanvas)