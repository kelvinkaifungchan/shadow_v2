import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';

import classes from './qrcode.module.css'

const QRCode = require('qrcode.react');

class PureQRModal extends React.Component {

    render() {
        console.log("PROPS IN SCM", this.props);
        return (
            <div>
                <Modal isOpen={this.props.modal.modal} toggle={this.props.toggle} >
                    <ModalHeader toggle={this.toggle}>Scan this to open the live canvas</ModalHeader>
                    <ModalBody>
                        <div className="row justify-content-center">
                            <div className={classes.qrcode}>
                            <QRCode value="http://facebook.github.io/react/" />
                            </div>
                        </div>
                        <div className="row text-center">
                        <button onClick={this.props.toggle} className="btn btn-outline-dark waves-effect w-100 m-2">Done</button>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


export const QRModal = connect(null, null)(PureQRModal)