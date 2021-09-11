import React from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import {logoutNowThunk} from '../Redux/actions/loginboxAction'

import { getdataThunk } from '../Redux/actions/action'

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
        user: state.userStore.user,
        classrooms: state.classroomStore.classroom,
        sets: state.setStore.set,
        cards: state.cardStore.card,
        tags: state.tagStore.tags,
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