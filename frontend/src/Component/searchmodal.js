import React from 'react';
import { connect } from 'react-redux'

import { Modal, ModalHeader, ModalBody, Form, ModalFooter } from 'reactstrap';

class PureSearchModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            criteria: "",
        }
    }

    onChangeField = (field, e) => {
        const state = {};
        state[field] = e.currentTarget.value;
        this.setState({
            criteria: state
        });
    }

    submit = (e) => {
        e.preventDefault();
        this.props.createTagMDP(this.state.criteria)
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.search.modal} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.toggle}> Share this with... </ModalHeader>
                    <ModalBody>
                        <Form>
                            <input onChange={this.onChangeField.bind(this, 'criteria')} value={this.state.criteria} type="text" className="form-control mb-4" placeholder="Type Something"/>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={(e)=>{this.submit(e); this.props.toggle()}} type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2">Search</button>
                        <button onClick={()=>{this.props.toggle()}} type="submit" className="btn btn-outline-danger waves-effect w-100 mb-2">Cancel</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}


export const SearchPopUp = connect(null, null)(PureSearchModal)