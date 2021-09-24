import React from 'react';
import {connect} from 'react-redux'

// Require Action
import { getdataThunk } from '../Redux/actions/action'

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
                correctDictationcard: this.props.cards.dictationcard.filter(dict => dict.id === parseInt(this.props.match.params.id))
            })
            const correctProps = nextProps.cards.dictationcard.filter(filter => filter.id === parseInt(this.props.match.params.id))

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
console.log("STATE IN VIEW DICTATION SUB", this.state)
console.log("PROPS IN VIEW DICTATION SUB", this.props)
        return (
            <div className="page">

                    <div className={classes.viewdictationcardsubmission}>
                        {/* 1st row: Header */}
                        <div className="row d-flex p-4">
                            <div className="col-8">
                                <h1>{this.state.correctDictationcard.length > 0 && this.state.correctDictationcard[0].dictationcardTitle}</h1>
                            </div>
                            <div className="col-4">
                            <button >Update Feedback</button>
                            </div>
                        </div>

                        <div className="row d-flex p-4">
                            <div className="col">
                            <table>
                                <tr>
                                <td className={classes.toprow}>Question</td>

                                {this.state.correctDictationcard[0] &&
                                            this.state.correctDictationcard[0].questions.length > 0 
                                            ? this.state.correctDictationcard[0].questions[0].submission.map((sub,index) => {
                                                        return (
                                                            <><td data-key={index} className={classes.mainrow}>{sub.displayName}</td>
                                                            <td data-key={index} className={classes.commentrow}>Comments</td> </>
                                                            
                                                        )
                                            }) : null
                            }                                 
                            </tr>

                                {this.state.correctDictationcard.length > 0 &&
                                    this.state.correctDictationcard[0].questions.length > 0
                                    ? this.state.correctDictationcard[0].questions.map((question, i) => {
                                        return(
                                            <tr data-key={i}>
                                                <td className={classes.toprow}>{question.dictationBody}</td>
                                            {question.submission.map((sub, index) => {
                                                return <><td className={classes.mainrow}><img src={sub.dictationSubmissionPath} alt="submission" width="auto" height="90"></img>
                                                </td><td data-key={index} className={classes.commentrow}>
                                                    <input type="text" placeholder="New Feedback"  /> </td></>
                                            })}

                                                </tr>
                                        )
                                    }) : null}

                                </table>
                                </div>
                        </div>
                    </div>
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