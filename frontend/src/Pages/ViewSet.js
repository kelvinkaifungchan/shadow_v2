import React from 'react';
import {connect} from 'react-redux'

import { Link } from 'react-router-dom';
import { logoutNowThunk } from '../Redux/loginbox/action'

import { NavBar } from '../Component/navbar';
import {Account} from './Account';
import { HeadingInput } from '../Component/headinginput';

import PrivateRoute from '../Component/PrivateRoute'
import { BrowserRouter , Switch} from "react-router-dom";

import { DisplayClassModule } from '../Component/displayclassmodule'
// import NavBar from '../Component/navbar';
// import HeadingInput from '../Component/headingInput';
// import Tags from '../Component/tags';
// import Users from '../Component/users';


import classes from './ViewSet.module.css'

class ViewSet extends React.Component {
    constructor(props){
        super(props)
        this.bg = {
            backgroundColor: "#F8DF4F"
        }
        this.state = {
            title: "classroomTitle",
            read: "readonly"
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

            <div className={classes.viewset}>
                <div classNmae="row d-flex p-4">
                    <div className="col-8">
                        <HeadingInput title={this.state}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col col-12">
                        <DisplayClassModule classrooms={this.props.classrooms}/>
                        {/* <p>Display Module</p> */}
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
        isAuthenticatedMSP: state.authStore.isAuthenticated,
        loading: state.dataStore.loading,
        error: state.dataStore.error,
        user: state.dataStore.user,
        classrooms: state.dataStore.classrooms,
        sets: state.dataStore.sets,
        cards: state.dataStore.cards,
        tags: state.dataStore.tags,
    }
}
const mapDispatchToProps  = dispatch => {
    return {
        logout: () => {
            dispatch(logoutNowThunk())
        }
    }
}


const connectedViewSet= connect(mapStateToProps, mapDispatchToProps)(ViewSet)
export { connectedViewSet as ViewSet };