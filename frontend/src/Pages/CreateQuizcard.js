import React from 'react';
import {connect} from 'react-redux'

import { Link } from 'react-router-dom';
import {Account} from './Account';
import PrivateRoute from '../Component/PrivateRoute'
import { BrowserRouter , Switch} from "react-router-dom";
import {NavBar} from '../Component/navbar';
// import HeadingInput from '../Component/headingInput';
// import FormSubmit from '../Component/formSubmit';
import {VideoRecorder} from '../Component/videorecorder';
import { CreatequizcardQuestion } from '../Component/createquizcardQuestion';
import classes from './CreateFlashcard.module.css'
import { HeadingInput } from '../Component/headinginput';


class CreateQuizcard extends React.Component {
    constructor(props){
        super(props)
        this.bg = {
            backgroundColor: '#F8DF4F'
        }
    }

    logout = (e) => {
        e.preventDefault();
        this.props.logout()
    }
    render() {
        console.log("i want to see the props",this.props);

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
                            <button cards={this.props.cards} onClick={(e)=>{this.navigateSet(e)}}>Create Card</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-6">
                            <VideoRecorder/>
                        </div>
                        <div className="col col-6">
                            <CreatequizcardQuestion/>
                            {/* <p>QuizcardQuestionsCreate</p> */}
                        </div>
                    </div>
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



const connectedCreateQuizcard = connect(mapStateToProps, null)(CreateQuizcard)
export { connectedCreateQuizcard as CreateQuizcard };