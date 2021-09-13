import React from 'react';
import { connect } from 'react-redux'

import { logoutNowThunk } from '../Redux/actions/loginboxAction'
import { getdataThunk } from '../Redux/actions/action'

import { NavBar } from '../Component/navbar';

// import Tags from '../Component/tags';
import { NewSharePopUp } from '../Component/sharemodal';
import { NewTagPopUp } from '../Component/newtagmodal';
// import Users from '../Component/users';
import { DisplaySetModule } from '../Component/displaysetmodule'
import { DisplayClassroomTag } from '../Component/displayclassroomtag';
import { AddnewPopUp } from '../Component/addnewmodal'

import classes from './ViewClassroom.module.css'

class ViewClassroom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            type: "",
            tagModal: false,
            shareModal: false,
        };
    }

    // componentDidMount() {
    //     this.props.getdata({ email: this.props.user.email })
    // }

    componentDidMount() {
        this.props.getdata({ email: "test@test.com" })
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }
    changeTypeClass() {
        this.setState({
            type: "class"
        })
    }

    tagToggle(){
        this.setState({
            tagModal: !this.state.tagModal
        })
    }

    shareToggle(){
        console.log('share tog')
        this.setState({
            shareModal: !this.state.shareModal
        })
    }

    logout = (e) => {
        e.preventDefault();
        this.props.logout()
    }

    render() {
        console.log("i want to see the props", this.props);

        return (
            <div>
                <NavBar />

            <div className={classes.viewclassroom}>
                <div className="row d-flex p-4">
                    <div className="col-8">
                    <h1>Sample Classroom Title</h1>
                    {/* <h1>{this.props.classrooms[0].title}</h1> */}
                    <h6>Sample Classroom Description</h6>
                        {/* <h6>{this.props.classrooms[0].description}</h6> */}
                    </div>
                    </div>

            <div className="row d-flex pl-4 pr-4 m-2">
            <div className={classes.sharingusericon}> 
                <img src={this.props.user.picture} alt="Avatar"></img>
            </div>

            <div className={classes.sharingusericon}> 
                <img src={this.props.user.picture} alt="Avatar"></img>
            </div>

                {/* <p>{this.props.classrooms[0].shared.displayName}</p> */}
                        {/* <Tags/> */}
                        <NewSharePopUp share={this.state} toggle={() => this.shareToggle()}/>
                        <span className={classes.sharingusericon}>
                        <button onClick={() => this.shareToggle()} className={classes.addusericon}><i className="fas fa-plus"></i></button>
                        </span>
            </div>

            <div className="row d-flex pl-4 pr-4 m-2">
            <button className={classes.tagbutton}>#sampletag</button>
                {/* <DisplayClassroomTag classrooms={this.props.classrooms} /> */}
                        <NewTagPopUp addTag={this.state} toggle={() => this.tagToggle()}/>
                        <span className="d-inline-flex ">
                        <button onClick={() => this.tagToggle()} className={classes.addtagbutton}><i className="fas fa-plus"></i></button>
                        </span>
                        </div>
                    {/* Add button */}
                    <div className="row d-flex justify-content-between m-3">
                        <AddnewPopUp create={this.state} toggle={() => this.toggle()} />
                        <div onClick={() => { this.changeTypeClass(); this.toggle(); }} className="col m-1 p-1 border border-4 rounded-lg d-inline-flex ">
                            <div className="col-4 m-1 p-1 d-flex justify-content-center align-items-center">
                                <i className="fas fa-plus" />
                            </div>
                            <div className="col-6 m-1 p-1 rounded-lg d-flex align-items-center">
                                <span>Add new or exist set</span>
                            </div>
                        </div>
                        

                        <DisplaySetModule sets={this.props.sets} />

                    </div>
                </div>
        </div>
        );
    }
}


const mapStateToProps = (state) => {
    console.log("state in VIEW CLASSROOM", state);
    return {
        email: state.authStore.email,
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
    }
}

const connectedViewClassroom = connect(mapStateToProps, mapDispatchToProps)(ViewClassroom)
export { connectedViewClassroom as ViewClassroom };