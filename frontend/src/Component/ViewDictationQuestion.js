import React from 'react';
import { connect } from 'react-redux';

// Require Action
import { getdataThunk } from '../Redux/actions/action';

import { addSubmissionThunk } from '../Redux/actions/submissionAction';

import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';

// import QuestionProgress from '../Component/questionProgress';
// import AudioPlayer from '../Component/audioPlayer';
import { Canvas } from './canvas';

//CSS
import classes from './ViewDictationQuestion.module.css'

class ViewDictationQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "dictation",
            questionId: this.props.question.questions[0].id,
            canvasUrl: "",
            submissions: []
        }
    }
    // this.props.question.questions[0].id gotta figure out how to put the questionId into state on load wihtout clicking

    onClickShowQuestionViewer(id) {
        this.setState({
            questionId: id,
        })

    }
    handleCanvas(fileName){
        console.log("fileName", fileName)
        let url  = `https://${process.env.REACT_APP_CANVAS_BUCKET}.s3.ap-southeast-1.amazonaws.com/` + fileName ;
        console.log("URL >>", url)

        this.setState({
            canvasUrl: url
        })
        
    }

    addSubmission(){
        console.log("adding to submissions array")

        this.setState((prevState, props) => {
            console.log("PREV", prevState)
            return{
            ...prevState,   
            submissions: [...prevState.submissions, {question_id: prevState.questionId, dictationcardSubmissionPath: prevState.canvasUrl}]
            }
        })

    }
    //gotta somehow have a button to submit all the data (the subsmission array in the state)
    submission(){
        console.log("submitting to redux store")
        this.props.submitDictationMDP({
            type:this.state.type,
            email: localStorage.getItem('email'),
            dictationcardId: this.props.dictation[0].id,
            dictationcardSubmissionPath: this.state.submissions
        })

    }
    render() {
        console.log("props in VDQQQQ", this.props);
        console.log("state in VDQQQQ", this.state);
        console.log("submissions length", this.state.submissions.length);
        console.log(" questions length", this.props.question.questions.length);

        return (

            <div className={classes.ViewDictationQuestion} >
                {/* <MediaQuery minWidth={1050}>
   
                </MediaQuery> */}
                <div >
                    <div className={classes.scrollicon} >
                        <div className="row" >

                            {this.props.question.questions &&
                                this.props.question.questions.length > 0 ?
                                this.props.question.questions.map(

                                    (question, i) => {
                                        if (i === 0) {
                                            return (
                                                <span key={i} onClick={() => this.onClickShowQuestionViewer(question.id)}>{i + 1}</span>
                                            )
                                        } else {
                                            return (
                                                <span key={i} onClick={() => { this.onClickShowQuestionViewer(question.id) }}>{i + 1}</span>
                                            )
                                        }
                                    }
                                )
                                : null}
                        </div>
                    </div>
                </div>
                <div className={classes.canvas}>        
                    {this.state.submissions.length === this.props.question.questions.length ? <button onClick={() => this.submission()}> Done </button> : <Canvas addSubmission={() => this.addSubmission()} handleCanvas={(fileName) => this.handleCanvas(fileName)} dictationId={this.props.dictation[0].id} userId={this.props.user.id.toString()} />}
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.userStore.user,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getdata: (email) => {
            dispatch(getdataThunk(email))
        },
        submitDictationMDP: (submission) => {
            dispatch(addSubmissionThunk(submission))
        }
    }
}


const connectedViewDictationQuestion = connect(mapStateToProps, mapDispatchToProps)(ViewDictationQuestion)
export { connectedViewDictationQuestion as ViewDictationQuestion };