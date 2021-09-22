import React from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody, Form, ModalFooter } from 'reactstrap';


// Require action here for uploading user picture

import classes from './iconupdatemodal.module.css'

class PureIconUpdateModal extends React.Component {
    constructor(props){
        super(props);
        this.state={
            iconModal: false,
            // selectedFile: {} 
        }
    }
    

onFileChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
}

// // On file upload (click the upload button)
// onFileUpload = () => {
//     // Create an object of formData
//     const formData = new FormData();
  
//     // Update the formData object
//     formData.append(
//       "myFile",
//       this.state.selectedFile,
//       this.state.selectedFile.name
//     );
  
//     // Details of the uploaded file
//     console.log(this.state.selectedFile);
  
//     // Request made to the backend api
//     // Send formData object
//     axios.post("api/uploadfile", formData);
//   };

  upload = (e) => {
    e.preventDefault();
    this.props.uploadPicture(this.state.selectedFile)
}


  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <p>File Details</p>
           
            <p>File Name: {this.state.selectedFile.name}</p>
            
                        
            <p>File Type: {this.state.selectedFile.type}</p>
            
                        
            <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>

        </div>
      );
    } else {
      return (
        <div>
          <p>Add a profile image for yourself </p>
        </div>
      );
    }
}

    render(){
        return(
            <Modal isOpen={this.props.upload.iconModal} toggle={()=>{this.props.toggle()}} className={classes.uploadicon}>
            <ModalHeader> Uploading new Icon </ModalHeader>
            <ModalBody>
                {this.fileData()}
                <Form>
                    <input type="file" onChange={this.onFileChange}/>
                    {/* <button onClick={this.onFileUpload}> Upload </button> */}
                    </Form>
            </ModalBody>

            <ModalFooter>
                        <button onClick={(e)=>{this.upload(e); this.props.toggle()}} type="submit" className="btn btn-outline-dark waves-effect w-100 mb-2">Confirm</button>
                        <button onClick={()=>{this.props.toggle()}} type="submit" className="btn btn-outline-danger waves-effect w-100 mb-2">Cancel</button>
                    </ModalFooter>
          </Modal>
        )
    }
} 



const mapDispatchToProps = dispatch => {
    return {
        uploadPicture: (pictureFile) => {
            let userPicture = {
                picture: pictureFile,
            }
            // dispatch(updatePictureThunk(userPicture))
                    // Require action to update password!!!
        }
    }
}

export const IconUpdateModal = connect(null, mapDispatchToProps)(PureIconUpdateModal)