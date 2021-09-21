import React from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';

import {logoutNowThunk} from '../Redux/actions/loginboxAction'
import { getdataThunk } from '../Redux/actions/action'

import classes from './Account.module.css'

class Account extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            modal: false,
            type: "",
            iconModal: false,
            passwordModal: false,
        };
    }

    componentDidMount() {
        console.log("componentDidMount", this.props)
        this.props.getdata({ email: localStorage.getItem('email') })
    }

    logout = (e) => {
        e.preventDefault();
        this.props.logout()
    }

    icontoggle() {
        this.setState({
            iconModal: !this.state.iconModal,
        });
        alert("Do you want to change your icon? WTF?")
    }

    passwordtoggle() {
        this.setState({
            passwordModal: !this.state.passwordModal,
        });
        alert("Do you want to change your password? WTF?")
    }

    render() {  

        return (
            <div className="page">
            {/* Navbar */}
                {/* <NavBar history={this.props.history}/> */}
            <div className={classes.account}>

                <div className="row p-4">
                <h1>Account </h1>
               </div>

                <div className="row p-4">
                    <div className="col-4 d-flex justify-content-center">
                        <div onClick={() => this.icontoggle()} className={classes.icon}> 
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
                                <td><button onClick={() => this.passwordtoggle()}>Change password</button></td>
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
        classrooms: state.classroomStore.classrooms,
        sets: state.setStore.sets,
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