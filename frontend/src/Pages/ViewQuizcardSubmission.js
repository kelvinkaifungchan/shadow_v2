import React from 'react';
import {connect} from 'react-redux'

import { Link } from 'react-router-dom';
import {logoutNowThunk} from '../Redux/actions/loginboxAction'
import {Account} from './Account';
import PrivateRoute from '../Component/PrivateRoute'
import { BrowserRouter , Switch} from "react-router-dom";
import {NavBar} from '../Component/navbar';
// import HeadingInput from '../Component/headingInput';
// import Table from '../Component/Table';

import classes from './ViewQuizcardSubmission.module.css'

class ViewQuizcardSubmission extends React.Component {
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
                <NavBar/>

            <div className={classes.viewquizcardsubmission}>
                {/* 1st row: Header */}
                <div className="row d-flex p-4">
                    <div className="col-8">
                        <h1>{this.props.location.state.card[0].quizcardTitle}</h1>
                    </div>
                </div>

                <div className="row d-flex p-4">
                    <table>
                        <th>Student</th>
                        <td></td>
                    </table>
                </div>

                <div className="row d-flex p-4">
                    <button cards={this.props.cards} onClick={(e)=>{this.navigateSet(e)}}>View Submission</button>
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
const mapDispatchToProps  = dispatch => {
    return {
        logout: () => {
            dispatch(logoutNowThunk())
        }
    }
}


const connectedViewQuizcardSubmission = connect(mapStateToProps, mapDispatchToProps)(ViewQuizcardSubmission)
export { connectedViewQuizcardSubmission as ViewQuizcardSubmission };