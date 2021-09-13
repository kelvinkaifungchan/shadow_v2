import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, Button} from 'reactstrap';

class PureSelectCardModal extends React.Component{

    render() {
        return (
            <div>
                <Modal isOpen={this.props.selectCard.selectModal} toggle={this.props.toggle} >
                    <ModalHeader toggle={this.toggle}> Select a card type </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col col-4 d-flex justify-content-center">
                                <Button onClick={(e)=>{this.props.navigate(e)}}><h2>Flashcard</h2> <br/> <span>Shadow to improve speaking</span></Button>
                            </div>
                            {/* <div className="col col-4 d-flex justify-content-center">
                                 <Link className="btn p-2 border" to="/createQuizcard"><h2>Quizcard</h2> <br/> <span>Test your knowledge</span></Link>
                            </div>
                            <div className="col col-4 d-flex justify-content-center">
                                 <Link className="btn p-2 border" to="/createDictationcard"><h2>Dictation Card</h2> <br/> <span>Write</span></Link>
                            </div> */}
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


export const SelectCardPopUp = connect(null, null)(PureSelectCardModal)