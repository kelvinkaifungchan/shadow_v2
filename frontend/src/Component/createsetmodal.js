import React from 'react'
import { connect } from 'react-redux'
// import {createClassThunk } from '../Redux/getdata/action'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';


class PureSetClassModal extends React.Component {
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
                <Modal isOpen={this.props.set.setModal} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.toggle}>Add New Set</ModalHeader>
                    <ModalBody>

                        <div className="col-6 m-1 p-1 border border-4 rounded-lg d-flex justify-content-between">
                            <div className="col-4 m-1 p-1 border border-4 rounded-lg d-flex justify-content-center align-items-center">
                            <i className="fas fa-plus" />
                            </div>
                            <div className=" ">
                                <span>
                                    Create set
                            </span>
                                <span>
                                    Click to add a new set.
                                </span>
                            </div>
                        </div>

                    </ModalBody>
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


export const CreateSetModal = connect(null, null)(PureSetClassModal)