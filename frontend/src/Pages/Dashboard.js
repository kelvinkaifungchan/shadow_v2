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
        return (
            <div>
            <NavBar data={this.props.data}/>
            <DisplayClassModule/>
            <DisplaySetModule/> 
            {this.props.loading && <div> Loading...</div>}
            {this.props.error && <div> Oops! Something Wrong with Our Server</div>}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    console.log("state in dashboard",state);

    return {
        loading:state.dataStore.loading,
        error:state.dataStore.error,
        data: state.dataStore.data,
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