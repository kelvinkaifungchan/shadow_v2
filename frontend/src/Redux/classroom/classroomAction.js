import axios from "axios";

export const ADD_CLASSROOM = "ADD_CLASSROOM";

export const addClassroom = (classroom) => async (dispatch) => {
    console.log("adding classroom")

   const { data } = await axios.post("http://localhost:8080/api/classroom", classroom)
   
    dispatch({type: ADD_CLASSROOM, payload: classroom});
}