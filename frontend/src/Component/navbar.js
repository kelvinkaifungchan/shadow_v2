import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import classes from './navbar.module.css'
import { getdataThunk } from '../Redux/getdata/action'
import { logoutNowThunk } from '../Redux/loginbox/action'

class PureNavBar extends React.Component {

    componentDidMount() {
        this.props.getdata({ email: "test@test.com" })
    }
    logout = (e) => {
        e.preventDefault();
        this.props.logout()
    }
    render() {
        console.log("this.props in navbar >>>>>>>>>>>",)

        return (
            <div className={classes.header}>
                <Link to='/' className={classes.logo}>Shadow</Link>
                <nav>
                    <ul>
                        <li>
                    <button><i className="fas fa-bars"></i></button>
                        </li>
                        <li>
                        <button><i className="fas fa-search"></i></button>
                        </li>
                        <li>
                        <Link to="/account" className={classes.icon}><img src={this.props.user.picture} alt="Avatar"></img></Link>
                        </li>
                        <li>
                        <Link to="/login" onClick={this.logout} >Logout</Link>
                        </li>
                    </ul>
                    </nav>
            </div>

        );
    }
}


const mapStateToProps = (state) => {
    console.log("state in dashboard", state);

    return {
        loading: state.dataStore.loading,
        error: state.dataStore.error,
        user: state.dataStore.user,
        classrooms: state.dataStore.classrooms,
        sets: state.dataStore.sets,
        cards: state.dataStore.cards,
        tags: state.dataStore.tags,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getdata: (email) => {
            dispatch(getdataThunk(email))
        },
        logout: () => {
            dispatch(logoutNowThunk())
        }
    }
}



export const NavBar = connect(mapStateToProps, mapDispatchToProps)(PureNavBar)