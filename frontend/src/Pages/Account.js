import React from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';

import { getdataThunk } from '../Redux/getdata/action'
import { logoutNowThunk } from '../Redux/loginbox/action'

import { NavBar } from '../Component/navbar';

import classes from './Account.module.css'

class Account extends React.Component {
    
    componentDidMount() {
        this.props.getdata({ email: "test@test.com" })
    }

    logout = (e) => {
        e.preventDefault();
        this.props.logout()
    }

    render() {  

        return (
            <div>
            {/* Navbar */}
                <NavBar/>
            <div className={classes.account}>

                <div className="row p-4">
                <h1>Account </h1>
               </div>

                <div className="row p-4">
                    <div className="col-4 d-flex justify-content-center">
                        <div className={classes.icon}> 
                    <img src={this.props.user.picture} alt="Avatar"></img>
                    </div>
                    </div>

                    <div className="col-8">
                        <table>
                            <tr>
                                <th>Role</th>
                                <td>{this.props.user.role}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Username</th>
                                <td>{this.props.user.displayName}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{this.props.user.email}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Tier</th>
                                <td>{this.props.user.tier}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Password</th>
                                <td>*******</td>
                                <td><button>Change password</button></td>
                            </tr>
                            <tr onClick={this.logout}> 
                            <th> <Link to="/login">Logout</Link></th>
                            <td></td>
                            <td></td>
                            </tr>
                        </table>    
                    </div>
                </div>

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
        getdata: (email) => {
            dispatch(getdataThunk(email))
        },
        logout: () => {
            dispatch(logoutNowThunk())
        }
    }
}


const connectedAccount= connect(mapStateToProps, mapDispatchToProps)(Account)
export { connectedAccount as Account };