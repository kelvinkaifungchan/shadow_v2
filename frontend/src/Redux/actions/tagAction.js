import axios from "axios";

export const ADD_TAG = "ADD_TAG";
export const ADD_TAG_CLASSROOM = "ADD_TAG_CLASSROOM";
export const ADD_TAG_SET = "ADD_TAG_SET";

export const DELETE_TAG = "DELETE_TAG";
export const DELETE_TAG_CLASSROOM = "DELETE_TAG_CLASSROOM";
export const DELETE_TAG_SET = "DELETE_TAG_SET";

export const addTag = (tag) => async (dispatch) => {
    console.log("adding tag")

   const { data } = await axios.post(`http://localhost:8080/api/tag/${tag.type}` , tag)

    dispatch({type: ADD_TAG, payload: {tagId: tag.tagId, tagBody: tag.tagBody}});
    
    if (tag.type === "classroom"){
        dispatch({type: ADD_TAG_CLASSROOM, payload: {tagId: tag.tagId, tagBody: tag.tagBody}});
    }
    if(tag.type === "set"){
        dispatch({type: ADD_TAG_SET, payload: {tagId: tag.tagId, tagBody: tag.tagBody}});
    }

}


export const deleteTag = (tag) => async (dispatch) => {
    console.log("delete tag")

   const { data } = await axios.delete(`http://localhost:8080/api/tag/${tag.type}`, tag)
   
   dispatch({type: DELETE_TAG, payload: {tagId: tag.tagId, tagBody: tag.tagBody}});
    
   if (tag.type === "classroom"){
       dispatch({type: DELETE_TAG_CLASSROOM, payload: {tagId: tag.tagId, tagBody: tag.tagBody}});
   }
   if(tag.type === "set"){
       dispatch({type: DELETE_TAG_SET, payload: {tagId: tag.tagId, tagBody: tag.tagBody}});
   }

}

