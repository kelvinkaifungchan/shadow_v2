import React from 'react';
import {connect} from 'react-redux'

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

import classes from './ViewFlashcard.module.css'

class ViewFlashCard extends React.Component {
    constructor(props){
        super(props)
        // this.bg = {
        //     backgroundColor: '#F8DF4F'
        // }
        this.state = {
            title: "classroomTitle",
            read: "readonly",
            type: "",
            correctSet: [],
        }
    }

    componentDidMount() {
        this.props.getdata({ email: "test@test.com" })
        this.getflashcard()
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
                    <h1>Sample Flashcard Title</h1>
                        {/* <h1>{this.props.sets[0].title}</h1> */}
                        <h6>Sample Flashcard Description</h6>
                        {/* <h6>{this.props.sets[0].description}</h6> */}
                </div>

                <div className="row d-flex p-4">
                        <div className="col">
                            <VideoPlayer/>
                        </div>
                        <div className="col">
                            <Transcript title={this.state}/>
                        </div>
                    </div>

                    <div className="row d-flex p-4">
                        <div className="col">
                            <VideoRecorder/>
                        </div>

                        <div className="col">
                            {/* <FlashcardSubmissions flashcard={this.props.cards.flashcard}/> */}
                            {/* <div className="flex-col d-flex"> */}
                            <div className={classes.submissions}>
                                <h3>Submissions</h3>
                                <div className={classes.scrollsubmission}>
                                    <button className={classes.scrollplusicon}> 
                                    <i className="fas fa-plus"></i>
                                    </button>
                                    
                                    {/* {this.props.location.state.cards.} */}
                                    <div className={classes.scrollicon}> 
                                        <img src={this.props.user.picture} alt="Avatar"></img>
                                    </div>

                                    <div className={classes.scrollicon}> 
                                        <img src={this.props.user.picture} alt="Avatar"></img>
                                    </div>

                                    <div className={classes.scrollicon}> 
                                        <img src={this.props.user.picture} alt="Avatar"></img>
                                    </div>

                                    <div className={classes.scrollicon}> 
                                        <img src={this.props.user.picture} alt="Avatar"></img>
                                    </div>

                                    <div className={classes.scrollicon}> 
                                        <img src={this.props.user.picture} alt="Avatar"></img>
                                    </div>

                                    <div className={classes.scrollicon}> 
                                        <img src={this.props.user.picture} alt="Avatar"></img>
                                    </div>


                                    <div className={classes.scrollicon}> 
                                        <img src={this.props.user.picture} alt="Avatar"></img>
                                    </div>


                                    <div className={classes.scrollicon}> 
                                        <img src={this.props.user.picture} alt="Avatar"></img>
                                    </div>


                                    <div className={classes.scrollicon}> 
                                        <img src={this.props.user.picture} alt="Avatar"></img>
                                    </div>


                                    <div className={classes.scrollicon}> 
                                        <img src={this.props.user.picture} alt="Avatar"></img>
                                    </div>


                                    <div className={classes.scrollicon}> 
                                        <img src={this.props.user.picture} alt="Avatar"></img>
                                    </div>

                                </div>
                            </div>

                            <div className={classes.feedback}>
                                <h3>Feedback</h3>
                                <div className={classes.scrollfeedback}>
                                    <div className={classes.scrollfeedbackcard}> 
                                    {/* <DisplayFlashcardFeedbackModule cards={this.props.cards}/> */}
                                    </div>

                                    <div className={classes.scrollfeedbackcard}> 
                                        <table> 
                                            <th>Timestamp</th>
                                            <td>Comment</td>
                                        </table>
                                    </div>

                                    <div className={classes.scrollfeedbackcard}> 
                                        <table> 
                                            <th>Timestamp</th>
                                            <td>Comment</td>
                                        </table>
                                    </div>

                                    <div className={classes.scrollfeedbackcard}> 
                                        <table> 
                                            <th>Timestamp</th>
                                            <td>Comment</td>
                                        </table>
                                    </div>
                                </div>
                            </div>
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