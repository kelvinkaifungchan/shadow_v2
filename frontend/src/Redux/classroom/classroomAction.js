import axios from "axios";

export const ADD_CLASSROOM = "ADD_CLASSROOM";

export const addClassroom = (email, title, desc) => async (dispatch) => {
    console.log("adding classroom")
   const { data } = await axios.post("http://localhost:8080/api/classroom", {email, title, desc})
   console.log(data, '<<<<<<<<data')
    dispatch({type: ADD_CLASSROOM, payload: {email, title, desc}});
}