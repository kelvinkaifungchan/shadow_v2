import axios from "axios";

export const EDIT_USER_DISPLAYNAME = "EDIT_USER_DISPLAYNAME";
export const EDIT_USER_EMAIL = "EDIT_USER_EMAIL";
export const EDIT_USER_PASSWORD = "EDIT_USER_PASSWORD";

export const UPLOAD_PICTURE = "UPLOAD_PICTURE";

export const uploadPictureThunk = (picture) => async (dispatch) => {
    console.log("uploading picture to s3", picture)
    console.log("working", picture.picture)
    console.log("working id", picture.id)
    return axios.post("http://localhost:8080/api/user/", picture, {headers: {'Content-Type': 'multipart/form-data'}})
    .then(response => {
        console.log("upating user picture", response.data)
        dispatch({
            type: UPLOAD_PICTURE,
            payload: {picture: response.data}
        })
    })
}

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
