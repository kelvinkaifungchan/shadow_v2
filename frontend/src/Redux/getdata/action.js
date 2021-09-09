import axios from 'axios';

export const GETDATA_SUCCESS = 'GETDATA_SUCCESS';
export const GETDATA_FAILURE = 'GETDATA_FAILURE';





export function getdataThunk(email) {
  return (dispatch) => {
    return axios.post(`${process.env.REACT_APP_API_SERVER}/api/shadow`, email)
    .then(response => {
      console.log("response",response);
      if (response.data == null) {
        dispatch({type: GETDATA_FAILURE});
      } else {
        dispatch({type: GETDATA_SUCCESS, payload: response});
      }
    }).catch(err => console.log("Error: ", err))
  }
}
