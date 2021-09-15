import React from 'react';
import {connect} from 'react-redux'
import ReactPlayer from 'react-player'

import { Link } from 'react-router-dom';
import { getdataThunk } from '../Redux/actions/action'
import { logoutNowThunk } from '../Redux/actions/loginboxAction'
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
            type: "",
            correctSet: [],
            show: Boolean(),
            res: [],
            recording: false,
            videos: [],
        }
        this.handleRecording = this.handleRecording.bind(this);
    }

    componentDidMount() {
        this.props.getdata({ email: "test@test.com" })
        // this.getflashcard()
    }

    // componentDidMount() {
    //     this.props.getdata({ email: localStorage.getItem("email") });
    //     this.getflashcard()
    //   }

    //   getflashcard(){
    //     this.props.location.state.classroom[0].bridge.map((setId) => {
    //         console.log("inlocation,smao");
    //         this.props.sets.map((set) => {
    //           if (set.id === setId.set_id) {
    //             this.setState({
    //                 correctSet:  this.state.correctSet.concat(set)
    //             })
    //           }
    //         });
    //       });
    //   }

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
            return { showSubmissionViewer: false};
        }
    
    onClickShowSubmissionViewer(){
            this.setState({
                showRecorder: false,
                showSubmissionViewer: true,
            })
        }

    handleRecording(record){
        this.setState({
            flashcardRecording: record
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
        // axios.post( http://13.228.254.45/api/set/feedback, {
        //     timeStamp: timeStamp,
        //     body: "",
        //     user: user,
        //     submissionId: submissionId,
        //     cardId: cardId
        // }).then((res) => {
        //     console.log("Update received")
        //     console.log(res)
        //     reload(res)
        // })

        const timeStamps = this.state.res.concat({ timeStamp: timeStamp })
        console.log("timeStamp", timeStamp)
        console.log("timeStamps", timeStamps)

        this.setState({
            res: timeStamps
        })
        console.log("this.state.res", this.state.res);

    }
    // logout = (e) => {
    //     e.preventDefault();
    //     this.props.logout()
    // }
    render() {
        console.log("i want to see the props",this.props);
        console.log("i want to see the state",this.state);

        return (
            <div>
                <NavBar/>

                <div className={classes.viewflashcard}>
                    <div classNmae="row d-flex p-4">
                    <div className="col-8">
                    {/* <h1>Sample Flashcard Title</h1> */}
                        <h1>{this.props.location.state.card[0].flashcardTitle}</h1>
                        {/* <h6>Sample Flashcard Description</h6> */}
                        {/* <h6>{this.props.location.state.card[0]}</h6> */}
                </div>

                <div className="row d-flex p-4">
                        <div className="col-6">
                            <Transcript title={this.state} transcript={this.state}/>
                        </div>
                        <div className="col-6">
                            <VideoPlayer/>
                        </div>
                    </div>

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
                                                    <div onClick={() => {this.onClickShowSubmissionViewer()}} key={j} className={classes.scrollicon}>
                                                        <img src={submission.picture} alt="Avatar"></img>
                                                    </div>
                                                    )
                                                }
                                            )
                                    : null}
                                </div>
                            </div>

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

                                {this.props.location.state.card[0].submission && 
                                        this.props.location.state.card[0].submission.length > 0
                                            ? this.props.location.state.card[0].submission.map(
                                                (submission, j) => {
                                                    return (
                                                    <div key={j} className={classes.scrollfeedbackcard}>
                                                        <table>
                                                            <th>{submission.feedback[0].flashcardFeedbackTime}</th>
                                                            <td>{submission.feedback[0].flashcardFeedbackBody}</td>
                                                            <td className={classes.commentinguser}><img src={submission.feedback[0].picture} alt="Avatar"></img></td>
                                                        </table>
                                                    </div>
                                                    )
                                                }
                                            )
                                    : null}
                                </div>
                            </div>
                        </div>

                        <div className="col-6">
                            {this.state.showRecorder && <VideoRecorder handleRecording={this.handleRecording}/>}
                            {this.state.showSubmissionViewer && <VideoPlayer/>}
                        </div>
                    </div>
                </div>

                    <BrowserRouter>
                        <Switch>
                    <PrivateRoute path="/account" component={Account} />
                    </Switch>
                    </BrowserRouter>
            </div>
            </div>
        );
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
    }
}


const connectedViewFlashCard= connect(mapStateToProps, mapDispatchToProps)(ViewFlashCard)
export { connectedViewFlashCard as ViewFlashCard };
