import React from 'react';
import {connect} from 'react-redux'

//Component
import { Account } from './Account';
import PrivateRoute from '../Component/PrivateRoute'
import { BrowserRouter , Switch} from "react-router-dom";
import { NavBar } from '../Component/navbar';
import { HeadingInput } from '../Component/headinginput';

// import FormSubmit from '../Component/formSubmit';
import { VideoRecorder } from '../Component/videorecorder';
import { VideoPlayer } from '../Component/videoplayer';
import { Transcript } from '../Component/transcript';
import FlashcardSubmissions from '../Component/displayflashcardsubmission';

// import FlashcardFeedbacks from '../Component/flashcardFeedbacks';
import { DisplayFlashcardFeedbackModule } from '../Component/displayflashcardfeedbackmodule';
import { NewCommentModal } from '../Component/newcommentmodal';

//Actions
import { getdataThunk } from '../Redux/actions/action'
import { addSubmissionThunk } from '../Redux/actions/submissionAction';


import classes from './ViewFlashcard.module.css'

class ViewFlashCard extends React.Component {
    constructor(props){
        super(props)
        // this.bg = {
        //     backgroundColor: '#F8DF4F'
        // }
        this.player = React.createRef();
        this.state = {
            title: "classroomTitle",
            read: "readonly",
            transcript: this.props.location.state.card[0].flashcardBody,
            type: "flashcard",
            correctSet: [],
            show: Boolean(),
            timeStamp: "",
            submissionTime: "",
            recording: false,
            submissionRecording: "",
            submissionid: "",
        }
        this.handleRecording = this.handleRecording.bind(this);
    }

    componentDidMount() {
        this.props.getdata({ email: localStorage.getItem('email') })
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }

    handleshow() {
        this.setState((prevState) => {
            return {
                show: !prevState.show
            }
        });
    }

    handleTimeStamp = (submissionTime) => {
        this.setState({
            submissionTime:submissionTime
        });
    }

    handleRecording(record){
        this.setState({
            submissionRecording: "https://" + process.env.AWS_BUCKET + ".s3.ap-southeast-1.amazonaws.com/" + record
        })
    }

    getRecorderInitialState(){
            return { showRecorder: false};
        }
    
    onClickShowRecorder(){
            this.setState({
                showRecorder: true,
                showSubmissionViewer: false
            })
        }
    
    getSubmissionViewInitialState(){
            return { 
                showSubmissionViewer: false, 
            };
        }
    
    onClickShowSubmissionViewer(id){
            this.setState({
                showRecorder: false,
                showSubmissionViewer: true,
                submissionid: id,
            })
        }

<<<<<<< HEAD
    async navigateFlashcard(e){
        e.preventDefault()
        await this.addSubmission()
        this.props.history.push({
            pathname:`/viewflashcard`,
            state: { card: this.props.location.state.card }
=======
    handleRecording(record){
        this.setState({
            submissionRecording: "https://" + process.env.AWS_BUCKET + ".s3.ap-southeast-1.amazonaws.com/" + record
        })
    }

    addTimeStamp() {
        const stamp = this.player.currentTime
        var m = Math.floor(stamp / 60);
        var s = Math.floor(stamp % 60);
        if (m.toString().length < 2) {
            m = '0' + m;
        }
        if (s.toString().length < 2) {
            s = '0' + s;
        }
        const timeStamp = (m + ':' + s)
        this.setState({
            timeStamp: timeStamp
>>>>>>> c1d65c1cf0713ae4d06edfdcce0e94fcbd70947f
        })
    }

    addSubmission(e) {
        e.preventDefault()
        console.log("adding submission!!!!!",this.state);
        this.props.addSubmission({
            type: this.state.type,
            email: localStorage.getItem('email'),
            flashcardId: this.props.location.state.card[0].id,
            flashcardSubmissionRecording: this.state.submissionRecording
        })
    }

    addTimeStamp() {
        this.setState({
            timeStamp: this.state.submissionTime
        })
    }

    render() {
        console.log("i want to see the props",this.props);
        console.log("i want to see the state",this.state);
        return (
            <div>
                <NavBar/>

                <div className={classes.viewflashcard}>

            {/* 1st row: Header */}
                    <div className="col-8">
                        <h1>{this.props.location.state.card[0].flashcardTitle}</h1>
                    </div>

            {/* 2nd row: Transcript & Video Player */}
                <div className="row d-flex p-4">
                        <div className="col-6">
                            <Transcript title={this.state} transcript={this.state}/>
                        </div>
                        <div className="col-6">
                            <VideoPlayer type={"display"} src={this.props.location.state.card[0].flashcardRecording}/>
                        </div>
                    </div>

            {/* 3rd row: Submission & Feedback & VideoRecorder / VideoPlayer */}
                    <div className="row d-flex p-4">
                        <div className="col-6">
                            {/* <FlashcardSubmissions flashcard={this.props.cards.flashcard}/> */}
                            {/* <div className="flex-col d-flex"> */}
                            <div className={classes.submissions}>
                                <h5>Submissions</h5>
                                <div className={classes.scrollsubmission}>
                                    <div onClick={() => {this.onClickShowRecorder()}} className={classes.scrollplusicon}> 
                                    <i className="fas fa-plus"></i>
                                    </div>
                                    
                                    {this.props.location.state.card[0].submission && 
                                        this.props.location.state.card[0].submission.length > 0
                                            ? this.props.location.state.card[0].submission.map(
                                                (submission, j) => {
                                                    return (
                                                    <div onClick={() => {this.onClickShowSubmissionViewer(submission.id)}} data-key={j} className={classes.scrollicon}>
                                                        <img src={submission.picture} alt="Avatar"></img>
                                                    </div>
                                                    )
                                                }
                                            )
                                    : null}
                                </div>
                            </div>
                            
                            {this.state.showSubmissionViewer && 
                            <div className={classes.feedback}>
                                <h5>Feedback</h5>
                                <div className={classes.scrollfeedback}>
                                
                                    <NewCommentModal location={this.props.location} create={this.state} toggle={() => this.toggle()} />
                                    
                                        <div className={classes.addcommentcontainer}>
                                        <div onClick={() => { this.addTimeStamp(); this.toggle(); }} className={classes.addcommentbox}>
                                            <div className={classes.addbtn}>
                                                <i className="fas fa-plus" />
                                            </div>
                                            <div className="col-6 m-1 p-1 rounded-lg d-flex align-items-center justify-content-center">
                                                <span>Add new comment</span>
                                            </div>
                                        </div>
                                        </div>
                                    

                                {this.state.showSubmissionViewer &&
                                    this.props.location.state.card[0].submission[this.state.submissionid - 1].feedback.length > 0 ?
                                    this.props.location.state.card[0].submission[this.state.submissionid - 1].feedback.map(
                                        (feedback, j) => {
                                            return (
                                            <div data-key={j} className={classes.scrollfeedbackcard}>
                                            <table>
                                                <tbody>
                                                <tr>
                                                <td>{feedback.flashcardFeedbackTime}</td>
                                                <td>{feedback.flashcardFeedbackBody}</td>
                                                <td className={classes.commentinguser}><img src={feedback.picture} alt="Avatar"></img></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                            )
                                        }
                                    )
                                    : null
                                }

                                {/* {this.props.location.state.card[0].submission && 
                                        this.props.location.state.card[0].submission.length > 0 &&
                                        this.props.location.state.card[0].submission.feedback &&
                                        this.props.location.state.card[0].submission.feedback.length > 0
                                            ? this.props.location.state.card[0].submission.map(
                                                (submission, j) => {
                                                    return (
                                                    <div data-key={j} className={classes.scrollfeedbackcard}>
                                                        <table>
                                                            <th>{submission.feedback[0].flashcardFeedbackTime}</th>
                                                            <td>{submission.feedback[0].flashcardFeedbackBody}</td>
                                                            <td className={classes.commentinguser}><img src={submission.feedback[0].picture} alt="Avatar"></img></td>
                                                        </table>
                                                    </div>
                                                    )   
                                                }
                                            )
                                    : null} */}
                                </div>
                            </div>
                            }

                        </div>

                        <div className="col-6">
                            {this.state.showRecorder && <VideoRecorder handleRecording={this.handleRecording}/>}
                            {this.state.showSubmissionViewer &&  <VideoPlayer time={this.handleTimeStamp} src={this.props.location.state.card[0].submission[this.state.submissionid - 1].flashcardSubmissionRecording}/>}
                            {this.state.showRecorder && 
                            <div className={classes.buttoncontainer}>
                             <button onClick={(e)=>{this.addSubmission(e)}}>Add Submission</button>
                            </div> 
                            }

                        </div>
                    </div>
                                <BrowserRouter>
                                    <Switch>
                                <PrivateRoute path="/account" component={Account} />
                                </Switch>
                                </BrowserRouter>
            </div>
            </div>
        )
}
}

const mapStateToProps = (state) => {
    return {
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
        addSubmission: (submission) => {
            dispatch(addSubmissionThunk(submission))
        }
    }
}


const connectedViewFlashCard= connect(mapStateToProps, mapDispatchToProps)(ViewFlashCard)
export { connectedViewFlashCard as ViewFlashCard };
