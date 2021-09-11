import React from 'react';
import {connect} from 'react-redux';
import {loginUserThunk} from '../Redux/actions/loginboxAction';

class PureVideoRecorder extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            show: Boolean(),
            res: [],
            recording: false,
            videos: [],
        };
        this.handleshow = this.handleshow.bind(this);
    }

    handleshow() {
        this.setState((prevState) => {
            return {
                show: !prevState.show
            }
        });
    }

    async start() {
        console.log("ready for record..");
        this.stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })

        this.video.srcObject = this.stream;
        this.video.play()
        .catch((err) => {
            console.log(err);
        });

        // init recording
        this.mediaRecorder = new MediaRecorder(this.stream, {
            mimeType: 'video/webm'
        });
        // init data storage for video chunks
        this.chunks = [];
        // listen for data from media recorder
        this.mediaRecorder.ondataavailable = e => {
            if (e.data && e.data.size > 0) {
                this.chunks.push(e.data);
            }
        };
    }

    startRecording(e) {
        e.preventDefault();
        // wipe old data chunks
        this.chunks = [];
        // start recorder with 10ms buffer
        this.mediaRecorder.start(10);
        // say that we're recording
        this.setState({ recording: true });
    }
    stopRecording(e) {
        e.preventDefault();
        // stop the recorder
        this.mediaRecorder.stop();
        // say that we're not recording
        this.setState({ recording: false });
        // save the video to memory
        this.upload()
        this.stream.getTracks().forEach(function (track) {
            if ((track.readyState === 'live' && track.kind === 'audio') || (track.readyState === 'live' && track.kind === 'video')) {
                track.stop()
            }
        })

    }
    async upload() {
        await this.handleshow()
        const blob = new Blob(this.chunks, {
            type: 'video/webm'
        });
        let time = new Date()
        let dt = time.getTime()
        let formData = new FormData();
        formData.append("file", blob, `${dt}.webm`);

        const videoURL = window.URL.createObjectURL(blob);
        // append videoURL to list of saved videos for rendering
        const videos = this.state.videos.concat([videoURL]);
        const preview = document.getElementById('preview');

        preview.setAttribute("src", videoURL)

        this.setState({ videos });
        // axios.post(
        //     ` http://localhost:8000/api/recording`, formData
        // )
        //     .done(() => {
        //         console.log("Embedding Video")
        //         return preview.setAttribute("src", videoURL)
        //     })
    }
    submit(){

    }
 

    render() {
        const { show } = this.state;
        return (

            <div className="col">
            <div className="pt-3 flex-col d-flex justify-content-center" id="videoSubmission">
                {show ? <video ref={a => { this.video = a }} className="bg-dark" id="video" width="560" height="315" autoPlay={true} muted="muted" ></video> : null}

                {!show ? <video ref={b => { this.player = b }} controls id="preview" width="560" height="315" src="" autoPlay={true} muted="muted"  ></video> : null}
            </div>
            <div className="row flex-row flex-nowrap">
                <div className="p-3 ml-auto mr-auto ">
                    {!show ? <span className="rounded-pill border border-warning bg-transparent p-2" id="start" title="Start Feed" onClick={() => { this.start(); this.handleshow() }}><i
                        className="fas fa-power-off"></i></span> : null}
                    {show ? <span className="rounded-pill border border-warning bg-transparent p-2" id="startRecording"
                        title="Start Recording" onClick={e => this.startRecording(e)}><i className="fas fa-circle"></i></span> : null}
                    {show ? <span className="rounded-pill border border-warning bg-transparent p-2" id="stopRecording"
                        title="Stop Recording" onClick={e => this.stopRecording(e)}><i className="fas fa-stop"></i></span> : null}
                </div>
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("this is state;", state);
    return {
        isAuthenticatedMSP: state.authStore.isAuthenticated
    }
}
const mapDispatchToProps = dispatch => {
    return {
        loginMDP: (email, password) => {
            dispatch(loginUserThunk(email, password))
        }
     
    }
}
export const VideoRecorder = connect(mapStateToProps, mapDispatchToProps)(PureVideoRecorder)