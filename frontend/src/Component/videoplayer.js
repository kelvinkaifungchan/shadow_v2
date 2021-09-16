import React from 'react';
import {connect} from 'react-redux'
import {loginUserThunk} from '../Redux/actions/loginboxAction'

class PureVideoPlayer extends React.Component {
    
    constructor(props) {
        super(props)
        this.player = React.createRef()
    }

    componentDidMount(){
        this.getTime()
    }



    getTime(){
        if (this.props.type) {
            return
        } else {
            setInterval(() => {
                const stamp = this.player.currentTime
                console.log("LOOK AT THE TIME", stamp)
                var m = Math.floor(stamp / 60);
                var s = Math.floor(stamp % 60);
                if (m.toString().length < 2) {
                    m = '0' + m;
                }
                if (s.toString().length < 2) {
                    s = '0' + s;
                }
                const timeStamp = (m + ':' + s)
                this.props.time(timeStamp)
            }, 1000)
        }
    }

    render() {
        return (
            <div className="d-flex justify-content-center">
                <video ref={v => { this.player = v }} controls allowFullScreen>
                <source src={this.props.src} type="video/mp4"/>
                </video>
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

export const VideoPlayer = connect(mapStateToProps, null)(PureVideoPlayer)