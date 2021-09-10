import axios from "axios";

export const ADD_CLASSROOM = "ADD_CLASSROOM";

export const addClassroom = (email, title, desc) => async (dispatch) => {
    console.log("adding classroom")
    console.log('1', email)
    console.log('1', title)
    console.log('1', desc)
   const { data } = await axios.post("http://localhost:8080/api/classroom", {email, title, desc})
   
    dispatch({type: ADD_CLASSROOM, payload: email, title, desc});
}