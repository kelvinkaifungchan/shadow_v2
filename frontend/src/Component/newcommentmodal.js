import React from 'react'
import { connect } from 'react-redux'

import { addFeedbackThunk } from '../Redux/actions/feedbackAction'
import { Modal, ModalHeader, ModalBody, Form, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';


class PureNewCommentModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            flashcardSubmissionBody: ""
        };
    }

    submit = (e) => {
        e.preventDefault();
        console.log("ADDDDDDDDDDDDDD=>>>>>>>>", this.props.create.type, this.props.user.email, this.props.create.submissionId, this.state.flashcardSubmissionBody, this.props.create.timeStamp);
        this.props.addFeedbackThunk(this.props.create.type, this.props.user.email, this.props.create.submissionId, this.state.flashcardSubmissionBody, this.props.create.timeStamp)
    }

    onChangeField = (field, e) => {
        const state = {};
        state[field] = e.currentTarget.value;
        this.setState(state);
    }

    render() {
        console.log("NEW COMMNET MODAL PROPS", this.props)
        return (
            <div>
                <Modal isOpen={this.props.create.modal} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.toggle}>Add new comment @{this.props.create.timeStamp}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <input
                                onChange={this.onChangeField.bind(this, this.props.create.timeStamp)}
                                value={this.props.create.timeStamp}
                                type="text"
                                className="form-control mb-4"
                                hidden={true} />

                            <input
                                onChange={this.onChangeField.bind(this, 'email')}
                                value={this.props.user.email}
                                type="text"
                                className="form-control mb-4"
                                hidden={true} />

                            <input
                                onChange={this.onChangeField.bind(this, "flashcardSubmissionBody")} value={this.state.flashcardSubmissionBody}
                                type="text"
                                className="form-control mb-4"
                                placeholder="Insert new comment." />
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={(e) => { this.submit(e); this.props.toggle() }} type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2"><div>Confirm</div></button>
                        <button onClick={(e) => { this.props.toggle() }} type="submit" className="btn btn-outline-danger waves-effect w-100 mb-2">Cancel</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("state in NEW COMMENT MODAL", state);

    return {
        user: state.userStore.user,
    }
}

// this.props.feedback.user_id,this.props.feedback.flashcardFeedbackBody, this.state.flashcardTitle

const mapDispatchToProps = dispatch => {
    return {
        addFeedbackThunk: (type, email, flashcardSubmissionId, flashcardFeedbackBody, flashcardFeedbackTime) => {
            let feedback = {
                type: type,
                email: email,
                submissionId: flashcardSubmissionId,
                body: flashcardFeedbackBody,
                timestamp: flashcardFeedbackTime
            }
            dispatch(addFeedbackThunk(feedback))
        },
    }
}


export const NewCommentModal = connect(mapStateToProps, mapDispatchToProps)(PureNewCommentModal)