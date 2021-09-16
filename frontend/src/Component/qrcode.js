import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';


class PureQRModal extends React.Component {

    render() {
        console.log("PROPS IN SCM", this.props);
        return (
            <div>
                <Modal isOpen={this.props.modal.modal} toggle={this.props.toggle} >
                    <ModalHeader toggle={this.toggle}>Scan this to open the live canvas</ModalHeader>
                    <ModalBody>
                        <div className="qr-code text-center">
                            <img src="https://chart.googleapis.com/chart?cht=qr&chl=Hello+World&chs=160x160&chld=L|0" />
                        </div>

                        <button >Done</button>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


export const QRModal = connect(null, null)(PureQRModal)