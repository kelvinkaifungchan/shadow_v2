import React from 'react';
import { connect } from 'react-redux'

// import { Link } from 'react-router-dom';
import { logoutNowThunk } from '../Redux/actions/loginboxAction'

import {NavBar} from '../Component/navbar';
import {HeadingInput} from '../Component/headinginput';
// import Tags from '../Component/tags';
import { NewTagPopUp } from '../Component/newtagmodal';
// import Users from '../Component/users';

import { DisplayCardModule } from '../Component/displaycardmodule'
import { AddnewPopUp } from '../Component/addnewmodal'


class ViewSet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectModal:false,
            modal: false,
            type: ""
        };
    }
    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
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
        console.log("i want to see the props", this.props);

        return (
            <div>
                <NavBar />
                <div className="row">
                    <div className="col col-12">
                        <HeadingInput/>
                        {/* <Tags/> */}
                        <p>Tags</p>

                        <NewTagPopUp addTag={this.state} toggle={()=>this.toggle()}/>
                        <span className="d-inline-flex "><h2 className="p-2 m-0">My Classroom</h2><span onClick={() => this.toggle()} className="btn rounded-pill border border-warning p-2"><i className="fas fa-plus"></i></span></span>
                        
                        {/* <Users/> */}
                        <p>Users</p>
                    </div>
                </div>
                <div className="p-3">

                    {/* Add button */}
                    <div className="row d-flex justify-content-between m-3">

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
    console.log("state in dashboard", state);

    return {
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