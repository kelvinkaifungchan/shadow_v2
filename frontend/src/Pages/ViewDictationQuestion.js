import React from 'react';
import {connect} from 'react-redux'

// Require Action
import { getdataThunk } from '../Redux/actions/action'

import { Link } from 'react-router-dom';
import {Account} from './Account';
import PrivateRoute from '../Component/PrivateRoute'
import { BrowserRouter , Switch} from "react-router-dom";

import {NavBar} from '../Component/navbar';
// import HeadingInput from '../Component/headingInput';
// import QuestionProgress from '../Component/questionProgress';
// import AudioPlayer from '../Component/audioPlayer';
import { Canvas } from '../Component/canvas'

class ViewDictationQuestion extends React.Component {
    constructor(props){
        super(props)
        this.state={
            user:{}
        }
    }
    async componentDidMount() {
        await this.props.getdata({ email: localStorage.getItem("email") });
    }

    render() {
        console.log("props in VDQ",this.props);

        return (
            <div className="page">
            <div className="row" style={this.bg}>
            <div className="col col-8">
                {/* <NavBar history={this.props.history}/> */}
                </div>
                <div className="col col-4">
                <Link to="/account">Account</Link>
                <Link onClick={this.logout} to="/login">Logout</Link>
                </div>
            </div>
            <div className="row">
                <div className="col col-12">
                    {/* <HeadingInput/> */}
                    <p>HeadingInput</p>
                </div>
            </div>
            <div className="row">
                <div className="col col-12">
                    {/* <QuestionProgress/> */}
                    <p>QuestionProgress</p>
                    {/* <AudioPlayer/> */}
                    <p>AudioPlayer</p>
                </div>
            </div>
            <div className="row">
                <div className="col col-12">
                    <Canvas user={this.props.user} canvasId={this.props.match.params.id}/>
                    <p>Canvas</p>
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
        isAuthenticatedMSP: state.authStore.isAuthenticated,
        user: state.userStore.user,
        sets: state.setStore.sets,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getdata: (email) => {
            dispatch(getdataThunk(email))
        },
    }
}


const connectedViewDictationQuestion= connect(mapStateToProps, mapDispatchToProps)(ViewDictationQuestion)
export { connectedViewDictationQuestion as ViewDictationQuestion };