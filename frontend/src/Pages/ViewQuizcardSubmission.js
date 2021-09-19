import React from 'react';
import {connect} from 'react-redux'

// Require Action
import { getdataThunk } from '../Redux/actions/action'

import { Link } from 'react-router-dom';
import {logoutNowThunk} from '../Redux/actions/loginboxAction'
import {Account} from './Account';
import PrivateRoute from '../Component/PrivateRoute'
import { BrowserRouter , Switch} from "react-router-dom";
import {NavBar} from '../Component/navbar';
// import HeadingInput from '../Component/headingInput';
// import Table from '../Component/Table';

import classes from './ViewQuizcardSubmission.module.css'

class ViewQuizcardSubmission extends React.Component {
    constructor(props){
        super(props)
        this.state={
            title: "classroomTitle",
            read: "readonly",
            type: "quizcard",
            correctSet: [],
            show: Boolean(),
            timeStamp: "",
            submissionTime: "",
            submissionId: "",
            correctSubmission:[],
            correctQuizcard: [],
        }
    }

    async componentDidMount() {
        await this.props.getdata({ email: localStorage.getItem("email") })
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.cards.quizcard.length > 0 ){
            this.setState({
                correctQuizcard: this.props.cards.quizcard.filter(flash => flash.id === parseInt(this.props.match.params.id))
            })
            const correctProps = nextProps.cards.quizcard.filter(filter => filter.id === parseInt(this.props.match.params.id))
            console.log("THIS IS THE CORRECT PROPS in View Quizcard Submission", correctProps)

            // const correctSub = this.state.correctQuizcard[0] && 
            //     this.state.correctQuizcard[0].question.length > 0
            //     ? this.state.correctQuizcard[0].question.map((question,i) => {
            //         return (
            //             question.submission.filter(sub => sub.user_id === question)
            //         )
            //     }) : null
            
            this.setState({
                correctSubmission: correctProps[0].submission,
            });
        }
    }

    logout = (e) => {
        e.preventDefault();
        this.props.logout()
    }
    render() {
        console.log("i want to see the props in VIEW QUIZCARD SUBMISSION",this.props);
        console.log("i want to see the STATES in VIEW QUIZCARD SUBMISSION",this.state);

        return (
            <div>
                <NavBar/>

                    <div className={classes.viewquizcardsubmission}>
                        {/* 1st row: Header */}
                        <div className="row d-flex p-4">
                            <div className="col-8">
                                {/* <h1>{this.props.location.state.quizcard.quizcardTitle}</h1> */}
                            </div>
                        </div>

                        <div className="row d-flex p-4">
                            <div className="col">
                            <table>

                        {/* First row of question number */}
                        <tr>
                            <th></th>
                            {this.state.correctQuizcard[0] &&
                                this.state.correctQuizcard[0].question.length > 0 
                                ? this.state.correctQuizcard[0].question.map((question, i) => {
                                    return (
                                        <th data-key={i}>Question {question.id}</th>
                                    )
                                }) : null
                        } 
                        </tr>

                        {/* Second row of correct answer */}
                        <tr> 
                            <th>Correct Answer</th>
                            {this.state.correctQuizcard[0] &&
                                this.state.correctQuizcard[0].question.length > 0 
                                ? this.state.correctQuizcard[0].question.map((question, i) => {
                                    return (
                                        <td data-key={i}>{question.questionType === "multipleChoice" 
                                        ? question.multipleChoiceAnswer 
                                            : question.trueFalseAnswer 
                                            ? "Ture" : "False" } </td>
                                    )
                                }) : null
                        } 
                        </tr>


                        {/* Third row of submission answer */}
                        {this.state.correctQuizcard[0] && 
                            this.state.correctQuizcard[0].question[0].submission.length > 0
                            ? this.state.correctQuizcard[0].question[0].submission.map((submission,i) => {
                                return (
                                    <tr data-key={i}>
                                        <th>{submission.displayName}</th>
                                    </tr>
                                )
                            }) : null
                        }

                        

                        

                        {/* Correct Answer Row */}
                        {/* <tr>
                            <th>Correct Answer</th>
                        {this.props.location.state.quizcard && 
                            this.props.location.state.quizcard.multipleChoice.length > 0 
                            ? this.props.location.state.quizcard.multipleChoice.map((question, i) => {
                            return (
                                
                                <td data-key={i} className={classes.correctAnswer}>
                                    {question.multipleChoiceAnswer}
                                </td>

                            )
                        }) : null
                        }
                        </tr> */}

                        {/* Submission Answer Row */}
                        {/* {
                        this.props.location.state.quizcard.multipleChoice[0].submission.length > 0
                        ? this.props.location.state.quizcard.multipleChoice[0].submission.map((submission, i) => {
                            return (
                                <tr data-key={i} className={classes.submission}>
                                    <th>Student {submission.user_id}</th>
                                    <td style={{background: submission.multipleChoiceMarking ? "#F4FFB4" : "#FCDDEC"}}>{submission.multipleChoiceSubmission}</td>
                                    </tr>
                            )
                        }) : null} */}

                        {/* <tr>
                            <th>{this.props.location.state.quizcard.multipleChoice[0].submission[0].user_id}</th>
                        {this.props.location.state.quizcard && 
                            this.props.location.state.quizcard.multipleChoice.length > 0 
                            ? this.props.location.state.quizcard.multipleChoice.map((question, i) => {
                            return (
                                
                                <td data-key={i} className={classes.correctAnswer}>
                                    {question.multipleChoiceAnswer}
                                </td>

                            )
                        }) : null
                        }
                        </tr> */}
                        </table>
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
        email: state.authStore.email,
        user: state.userStore.user,
        classrooms: state.classroomStore.classrooms,
        sets: state.setStore.sets,
        cards: state.cardStore.card,
        tags: state.tagStore.tags,
    }
}
const mapDispatchToProps  = dispatch => {
    return {
        getdata: (email) => {
            dispatch(getdataThunk(email))
        },
    }
}


const connectedViewQuizcardSubmission = connect(mapStateToProps, mapDispatchToProps)(ViewQuizcardSubmission)
export { connectedViewQuizcardSubmission as ViewQuizcardSubmission };