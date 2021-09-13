import React from 'react';
import {connect} from 'react-redux'

import { Link } from 'react-router-dom';
import {Account} from './Account';
import PrivateRoute from '../Component/PrivateRoute'
import { BrowserRouter , Switch} from "react-router-dom";
import {NavBar} from '../Component/navbar';
// import HeadingInput from '../Component/headingInput';
// import Table from '../Component/Table';


class ViewDictationcardSubmission extends React.Component {
    constructor(props){
        super(props)
        this.bg = {
            backgroundColor: '#F8DF4F'
        }
    }


    render() {
        console.log("i want to see the props",this.props);

        return (
            <div>
                <div className="row" style={this.bg}>
                    <div className="col col-8">
                    <NavBar history={this.props.history}/>
                    </div>
                    <div className="col col-4">
                    <Link to="/account">Account</Link>
                    <Link onClick={this.logout} to="/login">Logout</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-8">
                    {/* <HeadingInput/> */}
                    <p>HeadingInput</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-12">
                        {/* <Table/> */}
                        <p>Table</p>
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