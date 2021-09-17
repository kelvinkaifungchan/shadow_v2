import React from 'react';
import {connect} from 'react-redux'

import { Link } from 'react-router-dom';
import {Account} from './Account';
import PrivateRoute from '../Component/PrivateRoute'
import { BrowserRouter , Switch} from "react-router-dom";
import {NavBar} from '../Component/navbar';
// import HeadingInput from '../Component/headingInput';
// import Table from '../Component/Table';

import classes from './ViewDictationCardSubmission.module.css'

class ViewDictationcardSubmission extends React.Component {


    render() {
        console.log("i want to see the props in DICTATION SUBMISSION",this.props);

        return (
            <div>
                <NavBar/>

                    <div className={classes.viewdictationcardsubmission}>
                        {/* 1st row: Header */}
                        <div className="row d-flex p-4">
                            <div className="col-8">
                                <h1>{this.props.location.state.dictationcard.dictationcardTitle}</h1>
                            </div>
                        </div>

                        <div className="row d-flex p-4">
                            <div className="col">
                            <table>
                            <th></th>
                            {this.props.location.state.dictationcard && 
                            this.props.location.state.dictationcard.submissionlength > 0 
                            ? this.props.location.state.dictationcard.map((question, i) => {
                                return (
                                    <th>Question {question.id}</th>
                                )
                            }) : null
                            }

                            </table>
                        </div>



                        </div>
                    </div>

                    <BrowserRouter>
                        <Switch>
                    <PrivateRoute path="/account" component={Account} />
                    </Switch>
                    </BrowserRouter>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isAuthenticatedMSP: state.authStore.isAuthenticated
    }
}



const connectedViewDictationcardSubmission = connect(mapStateToProps, null)(ViewDictationcardSubmission)
export { connectedViewDictationcardSubmission as ViewDictationcardSubmission };