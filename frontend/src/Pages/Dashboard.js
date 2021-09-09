import React from 'react';
import {connect} from 'react-redux'

// import { Link } from 'react-router-dom';
import {getdataThunk} from '../Redux/getdata/action'
import '../Component/main.css'
import {NavBar} from '../Component/navbar'
import { DisplayClassModule} from '../Component/displayclassmodule'
import { DisplaySetModule} from '../Component/displaysetmodule'



class Dashboard extends React.Component {
    componentDidMount(){
        this.props.getdata({email:"test@test.com"})
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
        getdata: (email) => {
            dispatch(getdataThunk(email))
        }
    }
}


const connectedDashboard= connect(mapStateToProps, mapDispatchToProps)(Dashboard)
export { connectedDashboard as Dashboard };