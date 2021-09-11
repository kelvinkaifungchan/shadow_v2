import axios from "axios";

export const SUBMIT_CANVAS = "SUBMIT_CANVAS";

export const submitCanvas = (data) => async (dispatch) => {
    console.log("submitting canvas")
    const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    return axios.post("http://localhost:8080/api/canvas", data, config)
    .then(response => {
        console.log(response)
    })
}