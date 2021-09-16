import axios from "axios";

export const ADD_SHARING = "ADD_SHARING";
export const DELETE_SHARING = "DELETE_SHARING";

export const addSharingThunk = (sharing) => async (dispatch) => {
    console.log("SHOW ME THE SHARING", sharing);
    return axios.post("http://localhost:8080/api/sharing", sharing)
    .then((response) => {
        console.log("this is the sharing response", response)    
        dispatch({
                type: ADD_SHARING,
                payload: {id: {classroom_id: sharing.classroomId}, content:{id: response.data.user_id, email: response.data.email, displayName: response.data.displayName, picture: response.data.picture}}
            })
    })
    .catch(err => console.log("Error: ", err))
}

export const deleteSharingThunk = (sharing) => async (dispatch) => {
    return axios.delete("http://localhost:8080/api/sharing", sharing)
    .then(response => {
        console.log(response)
            dispatch({
                type: DELETE_SHARING,
                payload: {email: sharing.email, classroom_id: sharing.classroomId}
            })
    })
    .catch(err => console.log("Error: ", err))
}