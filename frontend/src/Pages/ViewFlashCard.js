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
// import FlashcardSubmissions from '../Component/flashcardSubmission';
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
        }
    }

    componentDidMount (){
        this.props.getdata({ email: localStorage.getItem('email') }) 
    }
    render() {
        console.log("i want to see the props",this.props);

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

                <div className="row" style={this.bg}>
                    <div className="col col-8">
                    <NavBar/>
                    </div>
                    <div className="col col-4">
                    <Link to="/account">Account</Link>
                    <Link onClick={this.logout} to="/login">Logout</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-8">
                    {/* <HeadingInput/> */}
                    <p>HeadingInput</p>
                    </div>
                    <div className="col col-4">
                    {/* <FormSubmit/> */}
                    <p>FormSubmit</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-6">
                        <VideoPlayer/>
                    </div>
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
                        <div className="col-6">
                            <VideoRecorder/>
                        </div>

                        <div className="col-6">
                            {/* <FlashcardSubmissions/> */}
                            {/* <div className="flex-col d-flex"> */}
                            <div className={classes.submissions}>
                                <h6>Submissions</h6>
                                <div className={classes.scrollsubmission}>
                                    <button className={classes.scrollplusicon}> 
                                    <i className="fas fa-plus"></i>
                                    </button>
                                    
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
                                <h6>Feedback</h6>
                                <div className={classes.scrollfeedback}>
                                    <div className={classes.scrollfeedbackcard}> 
                                    <DisplayFlashcardFeedbackModule cards={this.props.cards}/>
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