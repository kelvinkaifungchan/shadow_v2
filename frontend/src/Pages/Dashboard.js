import React from 'react';
import {connect} from 'react-redux'

import { Link } from 'react-router-dom';
import {logoutNowThunk} from '../Redux/loginbox/action'
import '../Component/main.css'
import {NavBar} from '../Component/navbar'
import { DisplayClassModule} from '../Component/displayclassmodule'
import { DisplaySetModule} from '../Component/displaysetmodule'



class Dashboard extends React.Component {
    logout = (e) => {
        e.preventDefault();
        this.props.logout()
    }
    render() {
        console.log("i want to see the props",this.props);

        return (
            <div>
            <NavBar/>
            <DisplayClassModule/>
            <DisplaySetModule/> 
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        stateMSP: state.dataStore.data

    }
}
const mapDispatchToProps  = dispatch => {
    return {
        logout: () => {
            dispatch(logoutNowThunk())
        }
    }
}


const connectedDashboard= connect(mapStateToProps, mapDispatchToProps)(Dashboard)
export { connectedDashboard as Dashboard };