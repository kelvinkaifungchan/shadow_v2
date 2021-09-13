import React from 'react';
import { connect } from 'react-redux'

// import { Link } from 'react-router-dom';
import { getdataThunk } from '../Redux/actions/action'
import '../Component/main.css'
import { NavBar } from '../Component/navbar'
import { CreatePopUp } from '../Component/createmodal'

// import { CreateClassBtn } from '../Component/createclassbtn'
// import { CreateSetBtn } from '../Component/createsetbtn'

import { DisplayClassModule } from '../Component/displayclassmodule'
import { DisplaySetModule } from '../Component/displaysetmodule'

import classes from './Dashboard.module.css'

class PureDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            type: "",
            classroomId: "",
        };
    }

    componentDidMount() {
        this.props.getdata({ email: this.props.email })
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }
    changeTypeClass(){
        this.setState({
            type: "class"
        })
    }
    changeTypeSet(){
        this.setState({
            type: "set"
        })
    }


    render() {
        return (
            <div>
                <NavBar user={this.props.user} />
                <CreatePopUp create={this.state} toggle={() => this.toggle()}/>
                <div className="p-3">
                    <div className="row d-flex p-4">
                        <div className="col ">
                        <span className={classes.createclassroombtn}>
                            <h2 className="p-2 m-0">My Classroom</h2>
                            
                                <button onClick={() => { this.changeTypeClass(); this.toggle(); }} className=""><i className="fas fa-plus"></i></button>
                                </span>
                        </div>
                        {/* <h2>My Classroom</h2>
                    <CreateClassBtn  /> */}

                    </div>
                    <DisplayClassModule classrooms={this.props.classrooms} />
                    
                    <div className="row d-flex p-4">
                        <div className="col ">
                            <CreatePopUp create={this.state} toggle={() => this.toggle() } history={this.props.history}/>
                            <span className={classes.createsetbtn}>
                            <h2 className="p-2 m-0">My Set</h2>
                                <button onClick={() => { this.changeTypeSet(); this.toggle(); }} className=""><i className="fas fa-plus"></i></button>
                                </span>
                        </div>
                        {/* <h2>My Set</h2>
                    <CreateSetBtn /> */}
                    </div>
                    <DisplaySetModule sets={this.props.sets} />
                    {this.props.loading && <div> Loading...</div>}
                    {this.props.error && <div> Oops! Something Wrong with Our Server</div>}

                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    console.log("state in dashboard", state);

    return {
        email: state.authStore.email,
        user: state.userStore.user,
        classrooms: state.classroomStore.classrooms,
        sets: state.setStore.sets,
        cards: state.cardStore.card,
        tags: state.tagStore.tags,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getdata: (email) => {
            dispatch(getdataThunk(email))
        }
    }
}


export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(PureDashboard)
