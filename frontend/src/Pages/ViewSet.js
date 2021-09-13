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
            selectModal:false,
            modal: false,
            type: "",
            tagModal: false,
            shareModal: false,
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


    selectToggle() {
        this.setState({
            selectModal: !this.state.selectModal,
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
                    <h1>Sample Set Title</h1>
                        {/* <h1>{this.props.sets[0].title}</h1> */}
                        <h6>Sample Set Description</h6>
                        {/* <h6>{this.props.sets[0].description}</h6> */}

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
                        <span className="d-inline-flex ">
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

                <div className="row">
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
                </div>

            </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    console.log("state in VIEWSET", state);

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


const connectedViewSet = connect(mapStateToProps, mapDispatchToProps)(ViewSet)
export { connectedViewSet as ViewSet };