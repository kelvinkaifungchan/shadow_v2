import React from 'react'
import { connect } from 'react-redux'
import { addClassroom } from '../Redux/actions/classroomAction'
import { Modal, ModalHeader, ModalBody, Form, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';


class PureModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            classroomTitle: "",
            classroomDesc: "",
            setTitle: "",
            setDesc: "",
        };
    }

    onChangeField = (field, e) => {
        const state = {};
        state[field] = e.currentTarget.value;
        this.setState(state);
    }

    submit = (e) => {
        console.log("this.props in createmodal", this.props);
        e.preventDefault();
        if (this.props.create.type === "class") {
            this.props.createClassMDP(this.props.user.email, this.state.classroomTitle, this.state.classroomDesc)
        } else {
            this.props.createClassMDP(this.props.user.email, this.state.classroomTitle, this.state.classroomDesc)
        }

    }

    render() {
        console.log("this.props.create", this.props.create);
        return (
            <div>
                <Modal isOpen={this.props.create.modal || this.props.create.setCreatePopUp} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.toggle}>Create {this.props.create.type === "class" ? "Classroom" : this.props.create.type === "set" ? "Set" : "Classroom"}</ModalHeader>
                    <ModalBody>
                        <Form>
                            {/* <input onChange={this.onChangeField.bind(this, 'email')} value={this.props.user.email} type="text" className="form-control mb-4"/> */}
                            <input onChange={this.onChangeField.bind(this, this.props.create.type === "class" ? "classroomTitle" : "setTitle")} value={this.state.title} type="text" className="form-control mb-4" placeholder={this.props.create.type === "class" ? "Classroom Title" : "Set Title"} />
                            <textarea onChange={this.onChangeField.bind(this, this.props.create.type === "class" ? "classroomDesc" : "setDesc")} value={this.state.description} type="text" style={{ resize: "none" }} className="form-control" placeholder={this.props.create.type === "class" ? "Classroom Description" : "Set Description"} />
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        {this.props.create.type === "class" ?
                            <button onClick={(e) => { this.submit(e); this.props.toggle() }} type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2"><Link to='/viewclassroom'><div>Create</div></Link> </button>:
                            <button onClick={(e) => { this.submit(e); this.props.toggle() }} type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2"><Link to='/viewset'><div>Create</div></Link></button>
                        }
                        <button onClick={() => { this.props.toggle() }} type="submit" className="btn btn-outline-danger waves-effect w-100 mb-2">Cancel</button>

                    </ModalFooter>
                </Modal>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("state in createmodal", state);

    return {
        user: state.userStore.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createClassMDP: (email, title, description) => {
            dispatch(addClassroom(email, title, description))
        },
    }
}


export const CreatePopUp = connect(mapStateToProps, mapDispatchToProps)(PureModel)
