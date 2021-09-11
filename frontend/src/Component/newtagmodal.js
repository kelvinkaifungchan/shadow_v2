import React from 'react';
import { connect } from 'react-redux'

import { Modal, ModalHeader, ModalBody, Form, ModalFooter } from 'reactstrap';

class PureTagModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tag: "",
        }
    }

    onChangeField = (field, e) => {
        const state = {};
        state[field] = e.currentTarget.value;
        this.setState({
            tag: state
        });
    }

    submit = (e) => {
        e.preventDefault();

        this.props.createClassMDP(this.state.title, this.state.description)
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.addTag.modal} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.toggle}> New Tag </ModalHeader>
                    <ModalBody>
                        <Form>
                            <input onChange={this.onChangeField.bind(this, 'tagBody')} value={this.state.tag} type="text" className="form-control mb-4" placeholder="#newtag"/>
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


export const NewTagPopUp = connect(null, null)(PureTagModal)