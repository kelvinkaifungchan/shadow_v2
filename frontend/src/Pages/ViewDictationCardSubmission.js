import React from 'react';
import {connect} from 'react-redux'

// Actions
import { getdataThunk } from '../Redux/actions/action'

//Components
import { FeedbackPopUp } from '../Component/feedbackmodal'

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
            feedbackId: "",
            feedbackBody: "",
            feedbackModal: false,
        }
    }

    async componentDidMount() {
        await this.props.getdata({ email: localStorage.getItem("email") })
    }

    componentWillReceiveProps() {
        if(this.props.cards.dictationcard.length > 0 ){
            let dictationcard = this.props.cards.dictationcard.filter(dict => dict.id === parseInt(this.props.match.params.id))
            console.log("this.props.cards.dictationcard", dictationcard[0])

            this.setState({
                correctDictationcard: dictationcard
            })
        }
    }

    feedbackModal(e) {
        this.setState({
            feedbackId: e.target.getAttribute('data-key'),
            feedbackBody: e.currentTarget.value,
        }, () => {
            this.feedbackToggle()
        })
    }

    feedbackToggle() {
        this.setState({
            feedbackModal: !this.state.feedbackModal
        })
    }

    render() {
        console.log("correct dictationcard", this.state.correctDictationcard)
        return (
            <div className="page">

                    <div className={classes.viewdictationcardsubmission}>
                        {/* 1st row: Header */}
                        <div className="row d-flex p-4">
                            <div className="col-8">
                                <h1>{this.state.correctDictationcard.length > 0 && this.state.correctDictationcard[0].dictationcardTitle}</h1>
                            </div>
                            <div className="col-4">
                            {/* <button >Update Feedback</button> */}
                            </div>
                        </div>

                        <div className="row d-flex p-4">
                            <div className="col">
                            <table>
                                <tr>
                                <td className={classes.toprow}>Question</td>

                                {this.state.correctDictationcard[0] && this.state.correctDictationcard[0].questions.length > 0 ? this.state.correctDictationcard[0].questions[0].submission.map((sub,index) => {
                                                        return (
                                                            <><td data-key={index} key={index} className={classes.mainrow}>{sub.displayName}</td>
                                                            <td data-key={index} key={"comment" + index} className={classes.commentrow}>Comments</td></>
                                                        )
                                            }) : null
                            }                                 
                                </tr>
                                {this.state.correctDictationcard.length > 0 &&
                                    this.state.correctDictationcard[0].questions.length > 0
                                    ? this.state.correctDictationcard[0].questions.map((question, i) => {
                                        return(
                                            <tr data-key={question.id} key={"submission" + i}>
                                                <td className={classes.toprow}>{question.dictationBody}</td>
                                            {question.submission.map((sub) => {
                                                return <>
                                                <td className={classes.mainrow}>
                                                    <img src={sub.dictationSubmissionPath} alt="submission" width="auto" height="90"></img>
                                                </td>
                                                <td data-key={sub.id} className={classes.commentrow}>
                                                    <input data-key={sub.feedback[0].id} type="text" placeholder="Add Feedback" value={sub.feedback[0].dictationFeedbackBody} onClick={(e) => this.feedbackModal(e)} readonly/>
                                                </td>
                                                </>
                                            })}
                                            </tr>
                                        )
                                    }) : null}
                                    <FeedbackPopUp user={this.props.user} feedback={this.state} toggle={() => this.feedbackToggle()}/>
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
        }
    }
}



const connectedViewDictationcardSubmission = connect(mapStateToProps, mapDispatchToProps)(ViewDictationcardSubmission)
export { connectedViewDictationcardSubmission as ViewDictationcardSubmission };