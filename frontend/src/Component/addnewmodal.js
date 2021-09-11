import React from 'react'
import { connect } from 'react-redux'
// import {createClassThunk } from '../Redux/getdata/action'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { AddExistPopUp } from '../Component/addexistmodal'


class PureModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            type: ""
        };
    }
    toggle() {
        console.log('t')
        this.setState({
            modal: !this.state.modal,
        });
    }
    changeTypeClass() {
        console.log('ctc')
        this.setState({
            type: "class"
        })
    }
    changeTypeSet() {
        console.log('cts')
        this.setState({
            type: "set"
        })
    }


    render() {
        return (

            <Modal  isOpen={this.props.create.modal} toggle={this.props.toggle}>
                <ModalHeader >Add New {this.props.create.type === "class" ? "Set" : this.props.create.type === "set" ? "Card":null}</ModalHeader>
                <ModalBody>
                    <AddExistPopUp create={this.state} toggle={() => this.toggle()} />

                    <div className="d-inline-flex p-3">
                        <div className="col-6 m-2 p-3 border border-4 rounded-lg d-inline-flex">
                            <div className="col-4 m-1 p-1 border border-4 rounded-lg d-flex justify-content-center align-items-center">
                                <i className="fas fa-plus" />
                            </div>
                            <div >
                                <div className="col">
                                    Create {this.props.create.type === "class" ? "Set" : this.props.create.type === "set" ? "Card":null}
                                </div>
                                <div className="col">
                                    Click to add a new {this.props.create.type === "class" ? "Set" : this.props.create.type === "set" ? "Card":null}.
                                </div>
                            </div>
                        </div>
                        <div className="col-6 m-2 p-3 border border-4 rounded-lg d-inline-flex">
                            <div onClick={() => { this.changeTypeClass(); this.toggle();  }} className="col-4 m-1 p-1 border border-4 rounded-lg d-flex justify-content-center align-items-center">
                               
                                <i className="fas fa-plus" />
                            </div>
                            <div >
                                <div className="col">
                                    Existing {this.props.create.type === "class" ? "Set" : this.props.create.type === "set" ? "Card":null}
                                </div>
                                <div className="col">
                                    Click to add a existing {this.props.create.type === "class" ? "Set" : this.props.create.type === "set" ? "Card":null}.
                                </div>
                            </div>
                        </div>
                    </div>

                </ModalBody>
            </Modal>
        )
    }
}


export const AddnewPopUp = connect(null, null)(PureModel)