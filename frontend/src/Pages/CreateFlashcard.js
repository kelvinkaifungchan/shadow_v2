import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import { Account } from './Account';
import PrivateRoute from '../Component/PrivateRoute'
import { BrowserRouter, Switch } from "react-router-dom";
import { NavBar } from '../Component/navbar';
import { HeadingInput } from '../Component/headinginput';
// import FormSubmit from '../Component/formSubmit';
import { VideoRecorder } from '../Component/videorecorder';
import { Transcript } from '../Component/transcript';
// import { Button } from "reactstrap";

import classes from './CreateFlashcard.module.css'
import { TypeaheadInputMulti } from 'react-bootstrap-typeahead';

class CreateFlashcard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type:"flashcard",
            title: "Add A Title",
            flashcardRecording:"",
        }
        this.handleHeading = this.handleHeading.bind(this);
        this.handleTranscript = this.handleTranscript.bind(this);
        this.handleRecording = this.handleRecording.bind(this);
    }

    handleHeading(title){
        this.setState({
            flashcardTitle: title
        })
    }

    handleTranscript(body){
        this.setState({
            flashcardBody: body
        })
    }

    handleRecording(record){
        this.setState({
            flashcardRecording: record
        })
    }


    render() {
        console.log("this.state in create flash card",this.state);
        return (
            <div>
                <NavBar history={this.props.history}/>
                {/* Page Container */}
                <div className={classes.createflashcard}>
                    {/* Header Row */}
                    <div className="row d-flex p-4">
                        <div className="col-8">
                            <HeadingInput card={this.state} handleHeading={this.handleHeading} heading={this.state}/>
                        </div>
                        <div className="col-4">
                            {/* <FormSubmit/> */}
                            <Link to='/viewset'><button>Create Card</button></Link>
                        </div>
                    </div>

                    {/* Video & Transcript row */}
                    <div className="row d-flex p-4">
                        <VideoRecorder handleRecording={this.handleRecording}/>
                        <Transcript title={this.state} handleTranscript={this.handleTranscript} />
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
        isAuthenticatedMSP: state.authStore.isAuthenticated
    }
}


const connectedCreateFlashcard = connect(mapStateToProps, null)(CreateFlashcard)
export { connectedCreateFlashcard as CreateFlashcard };