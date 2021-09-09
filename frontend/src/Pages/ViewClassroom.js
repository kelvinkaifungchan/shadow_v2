import React from 'react';
import {connect} from 'react-redux'

import { Link } from 'react-router-dom';
import {logoutNowThunk} from '../Redux/loginbox/action'
import {Account} from './Account';
import PrivateRoute from '../Component/PrivateRoute'
import { BrowserRouter , Switch} from "react-router-dom";

// import NavBar from '../Component/navbar';
// import HeadingInput from '../Component/headingInput';
// import Tags from '../Component/tags';
// import Users from '../Component/users';
// import DisplayModule from '../Component/displayModule';


class ViewClassroom extends React.Component {
    
    constructor(props){
        super(props)
        this.bg = {
            backgroundColor: "#F8DF4F"
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
                <div className="row" style={this.bg}>
                <div className="col col-8">
                    {/* <NavBar/> */}
                    <p>Navbar</p>
                    </div>
                    <div className="col col-4">
                    <Link to="/account">Account</Link>
                    <Link onClick={this.logout} to="/login">Logout</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-12">
                        {/* <HeadingInput/> */}
                        <p>HeadingInput</p>
                        {/* <Tags/> */}
                        <p>Tags</p>
                        {/* <Users/> */}
                        <p>Users</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-12">
                        {/* <DisplayModule/> */}
                        <p>Display Module</p>
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


const connectedViewClassroom= connect(mapStateToProps, mapDispatchToProps)(ViewClassroom)
export { connectedViewClassroom as ViewClassroom };