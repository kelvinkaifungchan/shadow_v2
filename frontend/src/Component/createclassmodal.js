import React from 'react'
import { connect } from 'react-redux'
// import {createClassThunk } from '../Redux/getdata/action'
import { Modal, ModalHeader, ModalBody, Form, ModalFooter } from 'reactstrap';


class PureModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: ""
        };
    }
    onChangeField = (field, e) => {
        const state = {};
        state[field] = e.currentTarget.value;
        this.setState(state);
    }
    submit = (e) => {
        e.preventDefault();
        this.props.createClassMDP(this.state.title, this.state.description)
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.classroom.classModal} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.toggle}>Create {this.props.classroom.type === "class" ? "Classroom" : "Set"}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <input onChange={this.onChangeField.bind(this, 'title')} value={this.state.title} type="text" className="form-control mb-4" placeholder={this.props.classroom.type ==="class" ? "Classroom Title" : "Set Title"} name={this.props.classroom.type ==="class" ? "classroomTitle" : "setTitle"}/>
                            <textarea onChange={this.onChangeField.bind(this, 'description')} value={this.state.description} type="text" style={{resize:"none"}}className="form-control" placeholder={this.props.classroom.type ==="class" ? "Classroom Description" : "Set Description"} name={this.props.classroom.type ==="class" ? "classroomDesc" : "setDesc"} />
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={this.submit} type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2">Create</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
// const mapDispatchToProps = dispatch => {
//     return {
//         createClassMDP: (title, description) => {
//             dispatch(createClassThunk(title, description))
//         },

//     }
// }


export const CreateClassPopUp = connect(null, null)(PureModel)