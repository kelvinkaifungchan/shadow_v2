import React from 'react';
import {connect} from 'react-redux'

import { Link } from 'react-router-dom';
import {Account} from './Account';
import PrivateRoute from '../Component/PrivateRoute'
import { BrowserRouter , Switch} from "react-router-dom";
// import NavBar from '../Component/navbar';
// import HeadingInput from '../Component/headingInput';
// import FormSubmit from '../Component/formSubmit';
import {VideoRecorder} from '../Component/videorecorder';
import { VideoPlayer } from '../Component/videoplayer';
// import Transcript from '../Component/transcript';
// import FlashcardSubmissions from '../Component/flashcardSubmission';
// import FlashcardFeedbacks from '../Component/flashcardFeedbacks';


class ViewFlashCard extends React.Component {
    constructor(props){
        super(props)
        this.bg = {
            backgroundColor: '#F8DF4F'
        }
    }


    render() {
        console.log("i want to see the props",this.props);

        return (
            <div>
                <div className="row" style={this.bg}>
                    <div className="col col-8">
                    {/* <NavBar/> */}
                    <p>Navbar</p>
                    </div>
                    <div className="col col-4">
                    <Link to="/account">Account</Link>
                    <Link onClick={this.logout} to="/login">Logout</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-8">
                    {/* <HeadingInput/> */}
                    <p>HeadingInput</p>
                    </div>
                    <div className="col col-4">
                    {/* <FormSubmit/> */}
                    <p>FormSubmit</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-6">
                        <VideoPlayer/>
                    </div>
                    <div className="col col-6">
                        {/* <Transcript/> */}
                        <p>Transcript</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-6">
                        <VideoRecorder/>
                    </div>
                    <div className="col col-6">
                        {/* <FlashcardSubmissions/> */}
                        <p>Submissions</p>
                        {/* <FlashcardFeedbacks/> */}
                        <p>Feedbacks</p>
                    </div>
                </div>
                    <BrowserRouter>
                        <Switch>
                    <PrivateRoute path="/account" component={Account} />
                    </Switch>
                    </BrowserRouter>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isAuthenticatedMSP: state.authStore.isAuthenticated
    }
}


const connectedViewFlashCard= connect(mapStateToProps, null)(ViewFlashCard)
export { connectedViewFlashCard as ViewFlashCard };