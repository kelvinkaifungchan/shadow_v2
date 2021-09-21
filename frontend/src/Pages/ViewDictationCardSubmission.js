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
// import Table from '../Component/Table';

import classes from './ViewDictationCardSubmission.module.css'

class ViewDictationcardSubmission extends React.Component {
    constructor(props){
        super(props)
        this.state={
            type: "dictationcard",
            correctSet: [],
            show: Boolean(),
            timeStamp: "",
            submissionTime: "",
            submissionId: "",
            correctSubmission:[],
            correctDictationcard: [],
        }
    }

    async componentDidMount() {
        await this.props.getdata({ email: localStorage.getItem("email") })
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.cards.dictationcard.length > 0 ){
            this.setState({
                correctDictationcard: this.props.cards.dictationcard.filter(flash => flash.id === parseInt(this.props.match.params.id))
            })
            const correctProps = nextProps.cards.dictationcard.filter(filter => filter.id === parseInt(this.props.match.params.id))
            console.log("THIS IS THE CORRECT PROPS in View DictationCard Submission", correctProps)

            // const correctSub = this.state.correctQuizcard[0] && 
            //     this.state.correctQuizcard[0].question.length > 0
            //     ? this.state.correctQuizcard[0].question.map((question,i) => {
            //         return (
            //             question.submission.filter(sub => sub.user_id === question)
            //         )
            //     }) : null
            
            this.setState({
                // correctSubmission: correctProps[0].submission,
            });
        }
    }
    render() {
        console.log("i want to see the props in DICTATION SUBMISSION",this.props);
        console.log("i want to see the state in DICTATION SUBMISSION",this.state);

        return (
            <div className="page">
                {/* <NavBar/> */}

                    <div className={classes.viewdictationcardsubmission}>
                        {/* 1st row: Header */}
                        <div className="row d-flex p-4">
                            <div className="col-8">
                                <h1>{this.state.correctDictationcard.length > 0 && this.state.correctDictationcard[0].dictationcardTitle}</h1>
                            </div>
                        </div>
                            {/* <table>
                                <th><br></br></th>
                                {this.state.correctDictationcard &&
                                    this.state.correctDictationcardQuizcard[0].questions.length > 0
                                    ? this.state.correctDictationcard[0].questions.map((question, i) => {
                                        return(
                                            <tr data-key={i}>
                                                <th>Question {question.id}</th>
                                                <td>Question body {question.dictationBody}</td>
                                                </tr>
                                        )
                                    }) : null}
                                </table> */}

                        <div className="row d-flex p-4">
                            <div className="col">

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



const connectedViewDictationcardSubmission = connect(mapStateToProps, mapDispatchToProps)(ViewDictationcardSubmission)
export { connectedViewDictationcardSubmission as ViewDictationcardSubmission };