import React from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody, Form, ModalFooter } from 'reactstrap';

// Require action to update password


import classes from './passwordupdatemodal.module.css'

class PurePasswordUpdateModal extends React.Component {
    constructor(props){
        super(props);
        this.state={
            passwordModal: false,
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        }
    }

    onChangeFieldOld = (field, e) => {
        const state = {};
        state.oldfield = e.currentTarget.value;
        this.setState({
            oldPassword: state.oldfield
        });
    }

    onChangeFieldNew = (field, e) => {
        const state = {};
        state.newfield = e.currentTarget.value;
        this.setState({
            newPassword: state.newfield
        });
    }

    onChangeFieldConfirm = (field, e) => {
        const state = {};
        state.confirmfield = e.currentTarget.value;
        this.setState({
            confirmPassword: state.confirmfield
        });
    }

    update = (e) => {
        e.preventDefault();
        this.props.updatePassword(this.state.oldPassword, this.state.confirmPassword)
    }

render(){
    return(
        <Modal isOpen={this.props.update.passwordModal} toggle={()=>{this.props.toggle()}} className={classes.uploadicon}>
        <ModalHeader> Updating Password </ModalHeader>
        <ModalBody>
            <Form>
                <input type="text" placeholder="Old Password" value={this.state.oldPassword} onChange={this.onChangeFieldOld.bind(this, 'oldPassword')} className="form-control mb-4"/>
                <input type="text" placeholder="New Password" value={this.state.newPassword} onChange={this.onChangeFieldNew.bind(this, 'newPassword')} className="form-control mb-4"/>
                <input type="text" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.onChangeFieldConfirm.bind(this, 'confirmPassword')} className="form-control mb-4"/>
                </Form>
                <ModalFooter>
                        <button onClick={(e)=>{this.update(e); this.props.toggle()}} type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2">Update</button>
                        <button onClick={()=>{this.props.toggle()}} type="submit" className="btn btn-outline-danger waves-effect w-100 mb-2">Cancel</button>
                    </ModalFooter>
      
        </ModalBody>
      </Modal>
    )
}
} 

const mapDispatchToProps = dispatch => {
    return {
        updatePassword: (oldPassword, confirmPassword) => {
            let userPassword = {
                oldPassword: oldPassword,
                confirmPassword: confirmPassword
            }
            // dispatch(updatePasswordThunk(userPassword))
                    // Require action to update password!!!
        }
    }
}

export const PasswordUpdateModal = connect(null, mapDispatchToProps)(PurePasswordUpdateModal)