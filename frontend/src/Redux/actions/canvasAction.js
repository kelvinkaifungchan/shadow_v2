import axios from "axios";

export const SUBMIT_CANVAS = "SUBMIT_CANVAS";

export const submitCanvas = (data) => async (dispatch) => {
    console.log("submitting canvas")

    const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }

   const { canvasData } = await axios.post("http://localhost:8080/", data, config)
   
   //DO WE NEED TO SEND CANVAS DATA TO REDUX THO??
    dispatch({type: SUBMIT_CANVAS, payload: data});
}