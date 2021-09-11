import React from 'react';
import {connect} from 'react-redux'

// import { Link } from 'react-router-dom';
import {Account} from './Account';
import PrivateRoute from '../Component/PrivateRoute'
import { BrowserRouter , Switch} from "react-router-dom";
import { NavBar } from '../Component/navbar';
import { HeadingInput } from '../Component/headinginput';
// import HeadingInput from '../Component/headingInput';
// import FormSubmit from '../Component/formSubmit';
import {VideoRecorder} from '../Component/videorecorder';
import { Transcript } from '../Component/transcript';
// import { Button } from "reactstrap";

import classes from './CreateFlashcard.module.css'

class CreateFlashcard extends React.Component {
    constructor(props){
        super(props)
        // this.bg = {
        //     backgroundColor: '#F8DF4F'
        // }
        this.state = {
            title: "classroomTitle"
        }
    }
    logout = (e) => {
        e.preventDefault();
        this.props.logout()
    }
    render() {
        console.log("i want to see the props",this.props);

        return (
            <div>
                {/* Navbar */}
                    <NavBar/>

                {/* Page Container */}
                <div className={classes.createflashcard}>
                    {/* Header Row */}
                    <div className="row d-flex p-4">
                        <div className="col-8">
                        <HeadingInput/>
                        </div>
                        <div className="col-4">
                        {/* <FormSubmit/> */}
                        <button>Create Card</button>
                        </div>
                    </div>

                    {/* Video & Transcript row */}
                <div className="row d-flex p-4">
                        <VideoRecorder/>
                            <Transcript title={this.state}/>
                </div>

                    <BrowserRouter>
                        <Switch>
                    <PrivateRoute path="/account" component={Account} />
                    </Switch>
                    </BrowserRouter>
            </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isAuthenticatedMSP: state.authStore.isAuthenticated
    }
}



const connectedCreateFlashcard= connect(mapStateToProps, null)(CreateFlashcard)
export { connectedCreateFlashcard as CreateFlashcard };