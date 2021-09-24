import axios from "axios";

export const EDIT_USER_DISPLAYNAME = "EDIT_USER_DISPLAYNAME";
export const EDIT_USER_EMAIL = "EDIT_USER_EMAIL";
export const EDIT_USER_PASSWORD = "EDIT_USER_PASSWORD";

export const editUserDisplayNameThunk = (user) => async (dispatch) => {
    return axios.put("http://localhost:8080/api/user/displayname", user)
    .then(response => {
            console.log("updating user displayname")
            dispatch({
                type: EDIT_USER_DISPLAYNAME,
                payload: {displayName: user.displayName}
            })
    })
    .catch(err => console.log("Error: ", err))
}

export const editUserEmailThunk = (user) => async (dispatch) => {
    return axios.put("http://localhost:8080/api/user/email", user)
    .then(response => {
            console.log("updating user email")
            dispatch({
                type: EDIT_USER_EMAIL,
                payload: {email: user.email}
            })
    })
    .catch(err => console.log("Error: ", err))
}

export const editUserPasswordThunk = (user) => async (dispatch) => {
    return axios.put("http://localhost:8080/api/user/password", user)
    .catch(err => console.log("Error: ", err))
}
