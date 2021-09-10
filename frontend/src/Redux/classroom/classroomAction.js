import axios from "axios";

export const ADD_CLASSROOM = "ADD_CLASSROOM";
export const EDIT_CLASSROOM = "EDIT_CLASSROOM";
export const DELETE_CLASSROOM = "DELETE_CLASSROOM";

export const addClassroom = (email, title, desc) => async (dispatch) => {

   const { data } = await axios.post("http://localhost:8080/api/classroom", {email, title, desc})
   
    dispatch({type: ADD_CLASSROOM, payload: email, title, desc});
}
