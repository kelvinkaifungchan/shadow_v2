import axios from "axios";

export const addVideoRecordingThunk = (recording) => async (dispatch) => {
    return axios.post("http://localhost:8080/api/recording/video")
    .then(response => {
        console.log(response)
    })
    .catch(err => console.log("Error: ", err))
}

export const addAudioRecordingThunk = (recording) => async (dispatch) => {
    return axios.post("http://localhost:8080/api/recording/audio")
    .then(response => {
        console.log(response)
    })
    .catch(err => console.log("Error: ", err))
}