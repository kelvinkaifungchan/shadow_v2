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

import classes from './ViewQuizcard.module.css'

class ViewQuizcard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: ""
        }
    }



    render() {

        return (
            <div>
                <NavBar/>

            <div className={classes.viewquizcard}>
                {/* 1st row: Header */}
                <div className="row d-flex p-4">
                    <div className="col-8">
                        <h1>{this.props.location.state.card[0].quizcardTitle}</h1>
                    </div>
                </div>

                <div className="row d-flex p-4">
                    <button cards={this.props.cards} onClick={(e)=>{this.navigateSet(e)}}>View Submission</button>
                </div>

                <div className="row d-flex p-4">
                    <button> Start</button>
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



const connectedViewQuizcard= connect(mapStateToProps, null)(ViewQuizcard)
export { connectedViewQuizcard as ViewQuizcard };