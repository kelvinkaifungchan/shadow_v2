import React from 'react';
import {connect} from 'react-redux'

import { Link } from 'react-router-dom';
import {Account} from './Account';
import PrivateRoute from '../Component/PrivateRoute'
import { BrowserRouter , Switch} from "react-router-dom";

import {NavBar} from '../Component/navbar';
// import HeadingInput from '../Component/headingInput';
// import QuestionProgress from '../Component/questionProgress';
import { VideoPlayer } from '../Component/videoplayer';
// import QuestionModal from '../Component/questionModal'; 



class ViewQuizcard extends React.Component {
    constructor(props){
        super(props)
        this.state={
            type: "quizcard"
        }
    }



    render() {
        console.log('view quizcard props', this.props)
        console.log('view quizcard props', this.state)
        return (
            <div>
                    <NavBar history={this.props.history}/>
                <div classNmae="row p-5">
                    <div className="col-8">
                        <h1>{this.props.location.state.card[0].quizcardTitle}</h1>
                    </div>
                </div>
                <div className="row p-5">
                    <div className="col col-6">
                        <VideoPlayer create={this.state}/>
                    </div>
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



const connectedViewQuizcard= connect(mapStateToProps, null)(ViewQuizcard)
export { connectedViewQuizcard as ViewQuizcard };