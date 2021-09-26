import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
// Require Action
import { getdataThunk } from '../Redux/actions/action';

import { addSubmissionThunk } from '../Redux/actions/submissionAction';

import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';

// import QuestionProgress from '../Component/questionProgress';

import { AudioPlayer } from './audioplayer';
import { Canvas } from './canvas'



//CSS
import classes from './ViewDictationQuestion.module.css'


class ViewDictationQuestion extends React.Component {
    
    constructor(props) {
        super(props);
        this.socket = io.connect("http://localhost:8080");
        this.state = {
            type: "dictation",
            questionId: this.props.question.questions[0].id,
            canvasUrl: "",
            base64ImageData: "",
            target: [],
        
        }
    }

    clearcanvas() {
        console.log("CLEAR ")
        this.room = this.props.user.id.toString() + "-" + this.props.dictation[0].id
        var canvas = document.querySelector('#board');
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var base64ImageData = canvas.toDataURL("image/png");
        this.socket.emit("clear", this.room, base64ImageData);
    }

    onClickShowQuestionViewer(id) {
        this.setState({
            questionId: id,
            target: this.props.question.questions.filter(realQuestion => realQuestion.id === id)[0]
        })
    }
   
    
    handleCanvas(fileName, base64ImageData){
        console.log("fileName", fileName)
        console.log("BASE", base64ImageData)
        let url  = `https://${process.env.REACT_APP_CANVAS_BUCKET}.s3.ap-southeast-1.amazonaws.com/` + fileName ;
        console.log("URL >>", url)

        this.setState({
            canvasUrl: url,
            base64ImageData: base64ImageData
        }) 

        this.props.submitDictationMDP({
            type:this.state.type,
            email: localStorage.getItem('email'),
            dictationcardId: this.props.dictation[0].id,
            dictationId: this.state.questionId,
            dictationcardSubmissionPath: url,
            feedback:  {type:"dictationcard", email: localStorage.getItem("email"), dictationSubmissionId:"", body: ""}
        })
    }

    // addSubmission(){
    //     console.log("adding to submissions array")
    //     if(this.state.submissions.filter((submission) => submission.question_id === this.state.questionId)){
    //     console.log("remove old submission")
    //     this.setState((prevState, props) => {
    //         console.log("PREV", prevState)
    //         return{
    //         ...prevState,   
    //         submissions: prevState.submissions.filter((submission) => submission.question_id !== prevState.questionId)
    //         }
    //     })
    //     }

    //     this.setState((prevState, props) => {
    //         console.log("PREV", prevState)
    //         return{
    //         ...prevState,   
    //         submissions: [...prevState.submissions, {question_id: prevState.questionId, dictationcardSubmissionPath: prevState.canvasUrl, base64ImageData: prevState.base64ImageData}]
    //         }
    //     })

    // }
  
   
    // submission(){
    //     console.log("submitting to redux store")
        
    //     this.props.submitDictationMDP({
    //         type:this.state.type,
    //         email: localStorage.getItem('email'),
    //         dictationcardId: this.props.dictation[0].id,
    //         dictationcardSubmissionPath: this.state.canvasUrl
    //     })
    // }
  
    render() {
        console.log("props in VDQQQQ", this.props);
        console.log("state in VDQQQQ", this.state);

        //console.log("submissions length", this.state.submissions.length);
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
                                                <span key={i} onClick={() => {this.clearcanvas(); this.onClickShowQuestionViewer(question.id)}}>{i + 1}</span>
                                            )
                                        } else {
                                            return (
                                                <span key={i} onClick={() => { this.clearcanvas(); this.onClickShowQuestionViewer(question.id) }}>{i + 1}</span>
                                            )
                                        }
                                    }
                                )
                                : null}
                                <AudioPlayer src={this.state.target.dictationRecording} test={this.state}/>
                        </div>
                    </div>
                </div>
                <div className={classes.canvas}>        
                    {/* {this.state.submissions.length === this.props.question.questions.length ? <button onClick={() => this.submission()}> Done </button> : <Canvas submission={() => this.submission()} clearcanvas={() => this.clearcanvas()} addSubmission={() => this.addSubmission()} handleCanvas={(fileName, base64ImageData) => this.handleCanvas(fileName, base64ImageData)} dictationId={this.props.dictation[0].id} userId={this.props.user.id.toString()} />} */}
                    <Canvas submission={() => {this.submission(); this.addFeedback()}} clearcanvas={() => this.clearcanvas()} addSubmission={() => this.addSubmission()} handleCanvas={(fileName, base64ImageData) => this.handleCanvas(fileName, base64ImageData)} dictationId={this.props.dictation[0].id} userId={this.props.user.id.toString()} />
                    

                </div>
                <div>

                    {/* {this.state.submissions.map((submission) => {
                        console.log("SRC", submission.dictationcardSubmissionPath)
                        return(
                            <img key={submission.dictationcardSubmissionPath} src={submission.base64ImageData} alt="canvasdata"/>
                        )
                    }) } */}
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