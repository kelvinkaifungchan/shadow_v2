import React from 'react';
import {connect} from 'react-redux'

import { Link } from 'react-router-dom';
import {logoutNowThunk} from '../Redux/loginbox/action'




class EditDictationCard extends React.Component {
    

    logout = (e) => {
        e.preventDefault();
        this.props.logout()
    }
    render() {
        console.log("i want to see the props",this.props);

        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi </h1>
                <p>You're logged in EditDictationCard</p>
                <h3>Users from secure api end point:</h3>
                <Link to="/account">Account</Link>
         
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


const connectedEditDictationCard = connect(mapStateToProps, mapDispatchToProps)(EditDictationCard)
export { connectedEditDictationCard as EditDictationCard };