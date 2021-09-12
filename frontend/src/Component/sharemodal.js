import React from 'react';
import { connect } from 'react-redux'

import { Modal, ModalHeader, ModalBody, Form, ModalFooter } from 'reactstrap';

class PureShareModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
        }
    }

    onChangeField = (field, e) => {
        const state = {};
        state[field] = e.currentTarget.value;
        this.setState({
            email: state
        });
    }

    submit = (e) => {
        e.preventDefault();
        this.props.createTagMDP(this.state.email)
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.share.shareModal} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.toggle}> Share this with... </ModalHeader>
                    <ModalBody>
                        <Form>
                            <input onChange={this.onChangeField.bind(this, 'email')} value={this.state.email} type="text" className="form-control mb-4" placeholder="Enter an email address"/>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={(e)=>{this.submit(e); this.props.toggle()}} type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2">Create</button>
                        <button onClick={()=>{this.props.toggle()}} type="submit" className="btn btn-outline-danger waves-effect w-100 mb-2">Cancel</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}


export const NewSharePopUp = connect(null, null)(PureShareModal)