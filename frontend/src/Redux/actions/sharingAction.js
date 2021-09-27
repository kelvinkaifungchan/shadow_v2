import axios from "axios";

export const ADD_SHARING = "ADD_SHARING";
export const DELETE_SHARING = "DELETE_SHARING";

export const addSharingThunk = (sharing) => async (dispatch) => {
    return axios.post("http://localhost:8080/api/sharing", sharing)
    .then((response) => {
    console.log("sharing response",response);

        dispatch({
                type: ADD_SHARING,
                payload: response.data
            })
    })
    .catch(err => console.log("Error: ", err))
}

export const deleteSharingThunk = (sharing) => async (dispatch) => {
    await axios.post("http://localhost:8080/api/sharing/del", sharing)
    dispatch({
                type: DELETE_SHARING,
                payload: {id: sharing.sharedId, classroom_id: sharing.classroomId}
            })
    
  
}