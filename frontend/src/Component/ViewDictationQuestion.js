import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
// Require Action
import { getdataThunk } from '../Redux/actions/action';
import { submitCanvas } from "../Redux/actions/canvasAction";
import { addSubmissionThunk } from '../Redux/actions/submissionAction';

// import MediaQuery from 'react-responsive';

// import QuestionProgress from '../Component/questionProgress';

import { AudioPlayer } from './audioplayer';
import { Canvas } from './canvas'
import { v4 as uuidv4 } from 'uuid';



//CSS
import classes from './ViewDictationQuestion.module.css'


class ViewDictationQuestion extends React.Component {
    
    constructor(props) {
        super(props);
        this.socket = io.connect("http://192.168.1.137:8080");
        this.state = {
            type: "dictation",
            questionId: this.props.question.questions[0].id,
            canvasUrl: "",
            base64ImageData: "",
            target: [],
            submissions:[]
        
        }
    }
    componentDidMount(){
        return this.props.getdata({ email: localStorage.getItem("email") })
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

    addSubmission(){
        console.log("adding to submissions array")
        if(this.state.submissions.filter((submission) => submission.question_id === this.state.questionId)){
        console.log("remove old submission")
        this.setState((prevState, props) => {
            console.log("PREV", prevState)
            return{
            ...prevState,   
            submissions: prevState.submissions.filter((submission) => submission.question_id !== prevState.questionId)
            }
        })
        }

        this.setState((prevState, props) => {
            console.log("PREV", prevState)
            return{
            ...prevState,   
            submissions: [...prevState.submissions, {question_id: prevState.questionId, dictationcardSubmissionPath: prevState.canvasUrl, base64ImageData: prevState.base64ImageData}]
            }
        })

    }
  
   
    // submission(){
    //     console.log("submitting to redux store")
        
    //     this.props.submitDictationMDP({
    //         type:this.state.type,
    //         email: localStorage.getItem('email'),
    //         dictationcardId: this.props.dictation[0].id,
    //         dictationcardSubmissionPath: this.state.canvasUrl
    //     })
    // }
    submit(canvas) {
        // var canvas = document.querySelector('#board');
        var base64ImageData = canvas.toDataURL("image/png")
        var imageData = base64ImageData.split(';base64,')[1];
        console.log(imageData)
        let fileName = uuidv4()
        let formData = new FormData();
        const byteCharacters = atob(imageData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "img/png" });
        formData.append("file", blob, fileName)

        //call the action to dispatch the action and post the canvas data to database
        this.props.submitMDP(formData)

        //put fileName up to ViewDicationQuestion and submit
        this.handleCanvas(fileName, base64ImageData);
        this.addSubmission();
        //this.props.submission();


        //this.props.clearcanvas()

    }
    render() {
        console.log("props in VDQQQQ", this.props);
        console.log("state in VDQQQQ", this.state);

        //console.log("submissions length", this.state.submissions.length);
        console.log(" questions length", this.props.question.questions.length);
        
        
        return (

            <div className={classes.ViewDictationQuestion} >
                
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
                                {this.state.target && <AudioPlayer src={this.state.target.dictationRecording} test={this.state}/>}
                        </div>
                    </div>
                </div>
                <div className={classes.container}>
                <div className={classes.canvas}>        
                    {/* {this.state.submissions.length === this.props.question.questions.length ? <button onClick={() => this.submission()}> Done </button> : <Canvas submission={() => this.submission()} clearcanvas={() => this.clearcanvas()} addSubmission={() => this.addSubmission()} handleCanvas={(fileName, base64ImageData) => this.handleCanvas(fileName, base64ImageData)} dictationId={this.props.dictation[0].id} userId={this.props.user.id.toString()} />} */}
                    <Canvas submission={() => {this.submission(); this.addFeedback()}} submit={(canvas)=>{this.submit(canvas)}} clearcanvas={() => this.clearcanvas()} addSubmission={() => this.addSubmission()} handleCanvas={(fileName, base64ImageData) => this.handleCanvas(fileName, base64ImageData)} dictationId={this.props.dictation[0].id} userId={this.props.user.id.toString()} />
                    
                <button onClick={() => this.submit(document.querySelector('#board'))}> Submit </button>

                </div>
                <div className={classes.preview}>

                    {this.state.submissions.map((submission) => {
                        console.log("SRC", submission.dictationcardSubmissionPath)
                        return(
                            <img key={submission.dictationcardSubmissionPath} src={submission.base64ImageData} alt="canvasdata"/>
                        )
                    }) }
                </div>
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
        },
        submitMDP: (data) => {
            dispatch(submitCanvas(data))
        }
    }
}


const connectedViewDictationQuestion = connect(mapStateToProps, mapDispatchToProps)(ViewDictationQuestion)
export { connectedViewDictationQuestion as ViewDictationQuestion };