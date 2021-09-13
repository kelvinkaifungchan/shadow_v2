import React from 'react'
import { connect } from 'react-redux'
import { addClassroom } from '../Redux/actions/classroomAction'
import { addSet } from '../Redux/actions/setAction'
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
        e.preventDefault();
        if (this.props.create.type === "class") {
            this.props.createClassMDP(this.props.user.email, this.state.classroomTitle, this.state.classroomDesc)
            // console.log('actionsactionsactionsactionsactionsactionsactionsactions', this.props.createClassMDP(this.props.user.email, this.state.classroomTitle, this.state.classroomDesc))
            // console.log(this.props)
            // this.props.history.push({
            //     pathname: '/viewclassroom',
            //     state: { classroom: 6 }
            // })
        } else {
            this.props.createClassMDP(this.props.user.email, this.state.setTitle, this.state.setDesc)
            // this.props.history.push({
            //     pathname: '/viewset',
            //     state: { set: 6 }
            // })
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
                            <input onChange={this.onChangeField.bind(this, 'email')} value={this.props.user.email} type="text" className="form-control mb-4" hidden="true"/>
                            <input onChange={this.onChangeField.bind(this, this.props.create.type === "class" ? "classroomTitle" : "setTitle")} value={this.props.create.type === "class" ? this.state.classroomTitle : this.state.setTitle} type="text" className="form-control mb-4" placeholder={this.props.create.type === "class" ? "Classroom Title" : "Set Title"} />
                            <textarea onChange={this.onChangeField.bind(this, this.props.create.type === "class" ? "classroomDesc" : "setDesc")} value={this.props.create.type === "class" ? this.state.classroomDesc : this.state.setDesc} type="text" style={{ resize: "none" }} className="form-control" placeholder={this.props.create.type === "class" ? "Classroom Description" : "Set Description"} />
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        {this.props.create.type === "class" ?
                            <button onClick={(e) => { this.submit(e); this.props.toggle() }} type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2"><Link to='/'><div>Create</div></Link> </button>:
                            <button onClick={(e) => { this.submit(e); this.props.toggle() }} type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2"><Link to='/'><div>Create</div></Link></button>
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
            let classroom = {
                email: email,
                title: title,
                desc: description
            }
            dispatch(addClassroom(classroom))
        },
        createSetMDP: (email, title, description) => {
            let set = {
                email: email,
                title: title,
                desc: description
            }
            dispatch(addSet(set))
        }
    }
}


export const CreatePopUp = connect(mapStateToProps, mapDispatchToProps)(PureModel)
