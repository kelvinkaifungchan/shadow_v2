import React from 'react'
import { connect } from 'react-redux'
// import {createClassThunk } from '../Redux/getdata/action'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { DisplaySetModule } from '../Component/displaysetmodule'
import { getdataThunk } from '../Redux/getdata/action'



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

            <Modal size="lg" isOpen={this.props.create.modal} toggle={this.props.toggle}>
                <ModalHeader >Add Exist {this.props.create.type === "class" ? "Classroom" : this.props.create.type === "set" ? "Set" : "Classroom"}</ModalHeader>
                <ModalBody>
                    <div className="">
                        {this.props.create.type === "class" ? <DisplaySetModule sets={this.props.sets} /> : this.props.create.type === "set" ? "Set" : <DisplaySetModule cards={this.props.cards} />}

                    </div>
                </ModalBody>
            </Modal>
        )
    }
}
const mapStateToProps = (state) => {
    console.log("state in dashboard", state);

    return {
        loading: state.dataStore.loading,
        error: state.dataStore.error,
        user: state.dataStore.user,
        classrooms: state.dataStore.classrooms,
        sets: state.dataStore.sets,
        cards: state.dataStore.cards,
        tags: state.dataStore.tags,
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