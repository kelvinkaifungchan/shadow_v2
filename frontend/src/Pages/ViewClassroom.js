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
                <div className="row">
                    <div className="col col-12">

                        {/* <Tags/> */}
                        <p>Tags</p>
                        <NewSharePopUp share={this.state} toggle={() => this.shareToggle()}/>
                        <span className="d-inline-flex "><h2 className="p-2 m-0">share</h2><span onClick={() => this.shareToggle()} className="btn rounded-pill border border-warning p-2"><i className="fas fa-plus"></i></span></span>

                        <NewTagPopUp addTag={this.state} toggle={() => this.tagToggle()}/>
                        <span className="d-inline-flex "><h2 className="p-2 m-0">tags</h2><span onClick={() => this.tagToggle()} className="btn rounded-pill border border-warning p-2"><i className="fas fa-plus"></i></span></span>
                        
                        {/* <Users/> */}
                        <p>Users</p>
                    </div>
                </div>
                <div className="p-3">

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