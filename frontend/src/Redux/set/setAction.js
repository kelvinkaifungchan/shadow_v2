import axios from "axios";

export const ADD_SET= "ADD_SET";

export const addSet = (set) => async (dispatch) => {
    console.log("adding set")

   const { data } = await axios.post("http://localhost:8080/api/set", set)
   
    dispatch({type: ADD_SET, payload: set});
}