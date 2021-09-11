import React from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import {logoutNowThunk} from '../Redux/actions/loginboxAction'



class Account extends React.Component {
    

    logout = (e) => {
        e.preventDefault();
        this.props.logout()
    }
    render() {
       

        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Account </h1>
               
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


const connectedAccount= connect(mapStateToProps, mapDispatchToProps)(Account)
export { connectedAccount as Account };