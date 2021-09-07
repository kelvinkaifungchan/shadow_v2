import React from 'react';
import {connect} from 'react-redux'

import { Link } from 'react-router-dom';
import {logoutNowThunk} from '../Redux/action'
import {Account} from './Account';
import PrivateRoute from '../Component/PrivateRoute'
import { BrowserRouter , Switch} from "react-router-dom";
// import NavBar from '../Component/navbar';


class CreateFlashcard extends React.Component {
    

    logout = (e) => {
        e.preventDefault();
        this.props.logout()
    }
    render() {
        console.log("i want to see the props",this.props);

        return (
            <div>
                <div className="row">
                    {/* <NavBar/> */}
                </div>
                <div className="col-md-6 col-md-offset-3">
                    <h1>Hi </h1>
                    <p>You're logged in with React & JWT!!</p>
                    <h3>Users from secure api end point:</h3>
                    <Link to="/account">Account</Link>
            
                    <p onClick={this.logout}> 
                    <Link to="/login">Logout</Link>
                    </p>
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
const mapDispatchToProps  = dispatch => {
    return {
        logout: () => {
            dispatch(logoutNowThunk())
        }
    }
}


const connectedCreateFlashcard= connect(mapStateToProps, mapDispatchToProps)(CreateFlashcard)
export { connectedCreateFlashcard as CreateFlashcard };