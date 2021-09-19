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

    navigateSubmission(e){
        this.props.history.push({
            pathname:`/viewQuizcardSubmission`,
            state: { quizcard: this.props.location.state.card[0]}
        })
    }

    render() {
        console.log("PROPS IN VIEW QUIZCARD", this.props)
        console.log("STATE IN VIEW QUIZCARD", this.state)

        return (
            <div>
                <NavBar user={this.props.user} history={this.props.history}/>

            <div className={classes.viewquizcard}>
                {/* 1st row: Header */}
                <div className="row d-flex p-4">
                    <div className="col-8">
                        <h1>{this.props.location.state.card[0].quizcardTitle}</h1>
                    </div>
                </div>

                <div className="row d-flex p-4">
                    <div className="col col-12 d-flex justify-content-center align-items-center">
                    <div className={classes.startbtncontainer}>
                    <span className={classes.startbtn}> Start Quiz</span>
                    </div>
                </div>
                </div>

                <div className="row d-flex p-4">
                    <div className="col col-12 justify-content-center align-items-center">
                    <button cards={this.props.cards} onClick={(e)=>{this.navigateSubmission(e)}}>View Submission</button>
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



const connectedViewQuizcard= connect(mapStateToProps, null)(ViewQuizcard)
export { connectedViewQuizcard as ViewQuizcard };