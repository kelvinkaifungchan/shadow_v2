import React from 'react';
import { connect } from 'react-redux'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,  Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { EditPopUp } from './editmodal';

import { deleteSharingThunk } from '../Redux/actions/sharingAction';
import { deleteClassroom } from '../Redux/actions/classroomAction';
import classes from './displayclassmodule.module.css'

class PureDisplayClassModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            editModal: false,
            type: "",
            classroomId: "",
            dashSet: "dashSet",
        };
    }
    

    changeTypeClass() {
        this.setState({
            type: "class"
        })
    }

    editToggle(){
        this.setState({
            editModal: !this.state.editModal
        })
    }

    deleteClassroom(classroomId) {
        if(this.props.user.role === "teacher"){
            this.props.deleteSharingThunk({
                sharedId: this.props.user.id,
                classroomId: classroomId
            })
            this.props.deleteClassroom({
                id: classroomId,
            })
        } else if (this.props.user.role === "student"){
            this.props.deleteSharingThunk({
                sharedId: this.props.user.id,
                classroomId: classroomId
            })
        }
    }
    
    render() {
        console.log(this.props, "props")
        return (
            <>
                {this.props.classrooms && this.props.classrooms.length > 0 && this.props.classrooms[0] !== 0 ? this.props.classrooms.map((classroom, i) => {
                    console.log(classroom)
                    return (
                        <div key={i} data-key={classroom.id} className={classes.classroom} onClick={(e) => { this.props.navigate(e, classroom.id) }}>
                            <div className="row">
                                <div className="col-10">
                                <h4 data-key={classroom.id} className={classes.title}>{classroom.title}</h4>
                                </div>

                                <div className="col-2">
                                {this.props.user.role === "teacher" ? 
                            <><UncontrolledDropdown data-key="dropdown"  className={classes.dropdown}>
                                    <DropdownToggle data-key="dropdown" style={{backgroundColor:'transparent', border: '0px'}}>
                                        <span data-key="dropdown" className={classes.detebtn}><i data-key="dropdown"  class="fas fa-ellipsis-h"></i></span>
                                    </DropdownToggle>
                                    <DropdownMenu right data-key="dropdown">
                                        <DropdownItem data-key="delete" onClick={() => this.deleteClassroom(classroom.id)}><div data-key="delete" >Delete Classroom<i data-key="delete" className="fas fa-trash ml-2"></i></div></DropdownItem>
                                        <DropdownItem data-key="edit" 
                                            onClick={() => { 
                                            this.changeTypeClass(); 
                                            this.editToggle()}} >
                                                <div data-key="edit">Edit Classroom<i data-key="edit" className="fa fa-pencil ml-2" ></i></div>
                                                </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown></> 
                                : null}
                                </div>

                            <EditPopUp edit={this.state} toggle={() => this.editToggle()} />
                            </div>
                            <p data-key={classroom.id}>{classroom.description}</p>
                            <div data-key={classroom.id}>
                                {classroom.tag && classroom.tag.length > 0 ? classroom.tags.map((tag, j) => {
                                    return (
                                        <span key={j} className="pl-3 pr-3 p-1 rounded-pill bg-dark text-light">#{tag.body}</span>
                                    )
                                }) : null}
                            </div>

                        </div>
                    )
                }) : null}
            </>

        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteClassroom: (classroom) => {
            dispatch(deleteClassroom(classroom))
        },
        deleteSharingThunk: (classroom) => {
            dispatch(deleteSharingThunk(classroom))
        }
    }
}

export const DisplayClassModule = connect(null, mapDispatchToProps)(PureDisplayClassModule)