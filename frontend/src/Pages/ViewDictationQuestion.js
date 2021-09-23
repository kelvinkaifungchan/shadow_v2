import React from 'react';
import {connect} from 'react-redux'

// Require Action
import { getdataThunk } from '../Redux/actions/action'

import { Link } from 'react-router-dom';
import {Account} from './Account';
import PrivateRoute from '../Component/PrivateRoute'
import { BrowserRouter , Switch} from "react-router-dom";
import MediaQuery from 'react-responsive'

// import QuestionProgress from '../Component/questionProgress';
import { AudioPlayer } from '../Component/audioplayer';
import { Canvas } from '../Component/canvas'


//CSS
// import classes from './ViewDictationQuestion.module.css'

class ViewDictationQuestion extends React.Component {
    constructor(props){
        super(props)
        this.state={
            user:{},
            correctSrc: ""
        }
    }
    async componentDidMount() {
        await this.props.getdata({ email: localStorage.getItem("email") });
    }

    handleSrc(e){
        console.log(this.props.cards)

    }

    render() {

        return (

            <div className="page" >
            <MediaQuery minWidth={1050}>
            <div  className="row" style={this.bg}>
            <div  className="col col-8">               
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
                    <p onClick={(e) => this.handleSrc(e)}>QuestionProgress</p>
                    <AudioPlayer /> 
                    
                    <p>AudioPlayer</p>
                </div>
            </div>
            </MediaQuery>
            <div className="row">
                <div className="col col-12">
                    <Canvas user={this.props.user} canvasId={this.props.match.params.id} />
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
        cards: state.cardStore.card,
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