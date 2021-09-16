import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, Button} from 'reactstrap';


class PureQRModal extends React.Component{

    render() {
        console.log("PROPS IN SCM",this.props);
        return (
            <div>
                <Modal isOpen={this.props.modal.modal} toggle={this.props.toggle} >
                    <ModalHeader toggle={this.toggle}> Select a card type </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col m-3 p-3 border border-4 rounded-lg d-inline-flex">
                                <Button onClick={(e)=>{this.props.navigate(e)}}>
                                    <div>Flashcard</div>
                                <div>Shadow to improve speaking</div>
                                </Button>
                            </div>
                            <div className="col col-4 d-flex justify-content-center">
                                 <Link className="btn p-2 border" to="/createQuizcard"><h2>Quizcard</h2> <br/> <span>Test your knowledge</span></Link>
                            </div>
                            <div className="col col-4 d-flex justify-content-center">
                                 <Link className="btn p-2 border" to="/createDictationcard"><h2>Dictation Card</h2> <br/> <span>Write</span></Link>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


export const QRModal = connect(null, null)( PureQRModal)