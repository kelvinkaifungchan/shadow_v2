import React from 'react';
import { connect } from 'react-redux'

import { Modal, ModalHeader, ModalBody, Form, ModalFooter } from 'reactstrap';

class PureTagModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tagBody: "",
        }
    }

    onChangeField = (field, e) => {
        const state = {};
        state[field] = e.currentTarget.value;
        this.setState({
            tagBody: state
        });
    }

    submit = (e) => {
        e.preventDefault();

        this.props.createClassMDP(this.state.title, this.state.description)
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.addTag.tagModal} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.toggle}> New Tag </ModalHeader>
                    <ModalBody>
                        <Form>
                            <input onChange={this.onChangeField.bind(this, 'tagBody')} value={this.state.tag} type="text" className="form-control mb-4" placeholder="#newtag"/>
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


export const NewTagPopUp = connect(null, null)(PureTagModal)