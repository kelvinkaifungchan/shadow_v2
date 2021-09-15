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
            dashSet: "dashSet",
        };
    }

    componentDidMount() {
        this.props.getdata({ email: localStorage.getItem('email')})
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

    navigateClass(e){
        // data = this.props.classrooms.filter(classroom => classroom.id === parseInt(this.props.location.state.classroom)),
        this.props.history.push({
            pathname:`/viewclassroom`,
            state: { classroom: this.props.classrooms.filter ((classroom) => {
                if(classroom.id === parseInt(e.target.attributes["data-key"].value)){
                    console.log('in if')
                    return classroom
                }
            })
        }
    })}
    navigateSet(e){
        this.props.history.push({
            pathname:`/viewset`,
            state: { set: this.props.sets.filter ((set) => {
                if(set.id === parseInt(e.target.attributes["data-key"].value)){
                    console.log('in if')
                    return set
                }
            }) 
        }
        })
    }

    render() {
        console.log('props in dashboard', this.props)
        return (
            <div >
                <NavBar  user={this.props.user} history={this.props.history}/>
                <CreatePopUp create={this.state} toggle={() => this.toggle()}/>
                
                <div className={classes.dashboard}>

                        <div className="row d-flex p-4">
                                <h1>My Classroom</h1>
                                <span className={classes.createclassroombtn}>
                                    <div onClick={() => { this.changeTypeClass(); this.toggle(); }} className={classes.addbtn}><i className="fas fa-plus"></i></div>
                                    </span>
                        </div>

                        <div className="row d-flex pl-4">
                        <DisplayClassModule classrooms={this.props.classrooms} navigate={(e)=>{this.navigateClass(e)}}/>
                        </div>

                        <div className="row d-flex p-4">
                                <CreatePopUp create={this.state} dash={this.state.dashSet} toggle={() => this.toggle() } history={this.props.history}/>
                                <h1>My Set</h1>
                                <span className={classes.createsetbtn}>
                                    <div onClick={() => { this.changeTypeSet(); this.toggle(); }} className={classes.addbtn}><i className="fas fa-plus"></i></div>
                                    </span>
                            </div>

                        <div className="row d-flex pl-4">
                        <DisplaySetModule sets={this.props.sets} navigate={(e)=>{this.navigateSet(e)}}/>
                        </div>
                        

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
