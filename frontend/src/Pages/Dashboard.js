import React from 'react';
import {connect} from 'react-redux'

import { Link } from 'react-router-dom';
import {logoutNowThunk} from '../Redux/loginbox/action'
import '../Component/main.css'




class Dashboard extends React.Component {
    

    logout = (e) => {
        e.preventDefault();
        this.props.logout()
    }
    render() {
        console.log("i want to see the props",this.props);

        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi </h1>
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                <Link to="/account">Account </Link>
                <Link to="/createclassroom">CreateClassroom </Link>
                <Link to="/viewclassroom">ViewClassroom </Link>
                <Link to="/createset">Createset </Link>
                <Link to="/viewset">Viewset </Link>
                <Link to="/viewdictationcardsubmission">ViewDictationCardSubmission </Link>
                <Link to="/createFlashcard">CreateFlashcard </Link>
                <Link to="/viewFlashcard">ViewFlashcard </Link>
                <Link to="/createQuizcard">CreateQuizcard </Link>
                <Link to="/viewQuizcard">ViewQuizcard </Link>
                <Link to="/viewQuizcardSubmission">ViewQuizcardSubmission </Link>
                <Link to="/createDictationcard">CreateDictationcard </Link>
                <Link to="/viewDictationcard">ViewDictationcard </Link>
                <Link to="/viewDictationCardSubmission">ViewDictationCardSubmission </Link>

                <p onClick={this.logout}> 
                <Link to="/login">Logout</Link>
                </p>
                
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


const connectedDashboard= connect(mapStateToProps, mapDispatchToProps)(Dashboard)
export { connectedDashboard as Dashboard };