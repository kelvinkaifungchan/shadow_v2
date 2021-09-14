import React from 'react'
import { connect } from 'react-redux'
// import {createClassThunk } from '../Redux/actions/classroomAction'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { DisplaySetModule } from '../Component/displaysetmodule'
import { getdataThunk } from "../Redux/actions/action"
import { DisplayCardModule } from './displaycardmodule';



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
        console.log('props in add exist modal', this.props)
        console.log('props.sets in add exist modal', this.props.sets)
        return (

            <Modal size="lg" isOpen={this.props.create.modal} toggle={this.props.toggle}>
                <ModalHeader >Add Exist {this.props.create.type === "class" ? "Set" : this.props.create.type === "set" ? "Card" : "Classroom"}</ModalHeader>
                <ModalBody>
                    <div className="">
                        {this.props.create.type === "class" ? <DisplaySetModule sets={this.props.sets} /> : <DisplayCardModule flashcard={this.props.correctCards.correctflashCard} quizcard={this.props.correctCards.correctquizCard} dictationcard={this.props.correctCards.correctdictationCard} navigate={(e)=> this.navigateCard(e)}/>}

                    </div>
                </ModalBody>
            </Modal>
        )
    }
}
const mapStateToProps = (state) => {
    console.log("state in dashboard", state);

    return {
        user: state.userStore.user,
        classrooms: state.classroomStore.classrooms,
        sets: state.setStore.sets,
        cards: state.cardStore.card,
        tags: state.tagStore.tags,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getdata: (email) => {
            dispatch(getdataThunk(email))
        }
    }
}



export const AddExistPopUp = connect(mapStateToProps, mapDispatchToProps)(PureModel)