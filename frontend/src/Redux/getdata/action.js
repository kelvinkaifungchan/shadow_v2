import axios from 'axios';

export const GETDATA_SUCCESS = 'GETDATA_SUCCESS';
export const GETDATA_FAILURE = 'GETDATA_FAILURE';


function getdataSuccessCreator() {
  return {
    type: GETDATA_SUCCESS
  }
}

function getdataFailureCreator(message) {
  return {
    type: GETDATA_FAILURE,
    message: message
  }
}

export function getdataThunk(email) {
  console.log("<<<<<<<<<<<<",email);
  return (dispatch) => {
    return axios.post(`${process.env.REACT_APP_API_SERVER}/api/shadow`, email)
    .then(response => {
      console.log(response);
      if (response.data == null) {
        dispatch(getdataFailureCreator('Get Data Fail'));
      } else {
        dispatch(getdataSuccessCreator(response));
      }
    }).catch(err => console.log("Error: ", err))
  }
}
