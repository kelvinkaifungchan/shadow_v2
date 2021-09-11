import React from 'react';
import {connect} from 'react-redux'

// import { Link } from 'react-router-dom';
import {logoutNowThunk} from '../Redux/loginbox/action'
import {Account} from './Account';
import PrivateRoute from '../Component/PrivateRoute'
import { BrowserRouter , Switch} from "react-router-dom";
import { NavBar } from '../Component/navbar';
// import HeadingInput from '../Component/headingInput';
// import FormSubmit from '../Component/formSubmit';
import {VideoRecorder} from '../Component/videorecorder';
import { Transcript } from '../Component/transcript';
// import { Button } from "reactstrap";

class CreateFlashcard extends React.Component {
    constructor(props){
        super(props)
        this.bg = {
            backgroundColor: '#F8DF4F'
        }
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
                <div className="row" style={this.bg}>
                    <div className="col">
                    <NavBar/>
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
                        <VideoRecorder/>
                    </div>
                    <div className="col col-5" >
                        <div className="p-3 h-100 border rounded-lg">
                            <Transcript title={this.state}/>
                        </div>
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
const mapDispatchToProps  = dispatch => {
    return {
        logout: () => {
            dispatch(logoutNowThunk())
        }
    }
}


const connectedCreateFlashcard= connect(mapStateToProps, mapDispatchToProps)(CreateFlashcard)
export { connectedCreateFlashcard as CreateFlashcard };