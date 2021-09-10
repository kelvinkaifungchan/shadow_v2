import axios from "axios";

export const ADD_TAG = "ADD_TAG";
export const EDIT_TAG = "EDIT_TAG";
export const DELETE_TAG = "DELETE_TAG";

export const addTag = (tag) => async (dispatch) => {
    console.log("adding tag")

   const { data } = await axios.post("http://localhost:8080/api/tag/", tag)
   
    dispatch({type: ADD_TAG, payload: tag});
}

export const editTag = (tag) => async (dispatch) => {
    console.log("editing tag")

   const { data } = await axios.put("http://localhost:8080/api/tag/", tag)
   
    dispatch({type: EDIT_TAG, payload: tag});
}

export const deleteTag = (tag) => async (dispatch) => {
    console.log("delete tag")

   const { data } = await axios.delete("http://localhost:8080/api/tag/", tag)
   
    dispatch({type: DELETE_TAG, payload: tag});
}

