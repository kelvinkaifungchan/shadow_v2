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
                        <h1>Sample Set Name{this.props.sets.title}</h1>
                        <h6>This is a sample description. {this.props.sets.description}</h6>
                    </div>
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
                        <DisplayCardModule cards={this.props.cards} />
                        {/* <p>Display card Module</p> */}
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


const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(logoutNowThunk())
        }
    }
}


const connectedViewSet = connect(mapStateToProps, mapDispatchToProps)(ViewSet)
export { connectedViewSet as ViewSet };