import React from 'react';
import {connect} from 'react-redux'
import {logoutNowThunk} from '../Redux/action'
import NavBar from '../Component/navbar';
import HeadingInput from '../Component/headingInput';
import FormSubmit from '../Component/formSubmit';
import VideoRecorder from '../Component/videoRecorder';
import Transcript from '../Component/Transcript';

class CreateFlashcard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            video:[],
            questions:[]
        }
    }
    render(){
        return (
            <div>
                <div>
                    <NavBar/>
                </div>
                <div className="row">
                    <div className="col col-8">
                        <HeadingInput/>
                    </div>
                    <div className="col col-4">
                        <FormSubmit/>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-6">
                        <VideoRecorder/>
                    </div>
                    <div className="col col-6">
                        <Transcript/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticatedMSP: state.authStore.isAuthenticated
    }
}
const mapDispatchToProps  = dispatch => {
    return {
        logout: () => {
            dispatch(logoutNowThunk())
        }
    }
}


const connectedCreateFlashcard = connect(mapStateToProps, mapDispatchToProps)(CreateFlashcard)

export {connectedCreateFlashcard as CreateFlashcard};