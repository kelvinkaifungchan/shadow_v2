import React from 'react';
import { connect } from 'react-redux'

import { getdataThunk } from '../Redux/actions/action'
import { logoutNowThunk } from '../Redux/actions/loginboxAction'

import { Link } from 'react-router-dom';

import { NavBar } from '../Component/navbar';
import {Account} from './Account';
import { HeadingInput } from '../Component/headinginput';

import PrivateRoute from '../Component/PrivateRoute'
import { BrowserRouter , Switch} from "react-router-dom";

import { DisplayClassModule } from '../Component/displayclassmodule'
import { DisplayCardModule } from '../Component/displaycardmodule';
// import NavBar from '../Component/navbar';
// import HeadingInput from '../Component/headingInput';
// import Tags from '../Component/tags';
import { NewSharePopUp } from '../Component/sharemodal';
import { NewTagPopUp } from '../Component/newtagmodal';
// import Users from '../Component/users';

import { AddnewPopUp } from '../Component/addnewmodal'

import classes from './ViewSet.module.css'



class ViewSet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "classroomTitle",
            read: "readonly",
            selectModal:false,
            modal: false,
            type: ""
        }
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

    changeTypeSet(){
        this.setState({
            type: "set"
        })
    }

    render() {
        console.log("VIEW SET PROPS", this.props);

        return (
            <div>
                <NavBar/>

            <div className={classes.viewset}>
                <div classNmae="row d-flex p-4">
                    <div className="col-8">
                        <h1>{this.props.sets[0].title}</h1>
                        <h6>{this.props.sets[0].description}</h6>
                    </div>
                </div>

<div className="row">
<NewSharePopUp share={this.state} toggle={() => this.shareToggle()}/>
                        <span className="d-inline-flex "><h2 className="p-2 m-0">share</h2><span onClick={() => this.shareToggle()} className="btn rounded-pill border border-warning p-2"><i className="fas fa-plus"></i></span></span>

</div>
               
               <div className="row">
                        <NewTagPopUp addTag={this.state} toggle={() => this.tagToggle()}/>
                        <span className="d-inline-flex "><h2 className="p-2 m-0">tags</h2><span onClick={() => this.tagToggle()} className="btn rounded-pill border border-warning p-2"><i className="fas fa-plus"></i></span></span>
                        </div>

                <div className="row">
                    <div className="col col-12">
                    <AddnewPopUp create={this.state} toggle={() => this.toggle()} /> 
                        <div onClick={() => { this.changeTypeSet(); this.toggle(); }} className="col-3 m-1 p-1 border border-4 rounded-lg d-inline-flex ">
                            <div className="col-4 m-1 p-1 d-flex justify-content-center align-items-center">
                                <i className="fas fa-plus" />
                            </div>
                            <div className="col-6 m-1 p-1 rounded-lg d-flex align-items-center">
                                <span>Add new or exist card</span>
                            </div>
                        </div>
                        <div className="row">
                        <DisplayCardModule cards={this.props.cards} />
                        </div>
                    </div>
                </div>

            </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    console.log("state in VIEWSET", state);

    return {
        isAuthenticatedMSP: state.authStore.isAuthenticated,
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


const connectedViewSet = connect(mapStateToProps, mapDispatchToProps)(ViewSet)
export { connectedViewSet as ViewSet };