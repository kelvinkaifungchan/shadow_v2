import axios from "axios";

export const ADD_CARD = "ADD_CARD";
export const EDIT_CARD = "EDIT_CARD";
export const DELETE_CARD = "DELETE_CARD";

export const addCard = (card) => async (dispatch) => {
    console.log("adding card")

   const { data } = await axios.post("http://localhost:8080/api/card", card)
   
    dispatch({type: ADD_CARD, payload: card});
}

export const editCard = (card) => async (dispatch) => {
    console.log("editing card")

   const { data } = await axios.put("http://localhost:8080/api/card", card)
   
    dispatch({type: EDIT_CARD, payload: card});
}

export const deleteCard = (card) => async (dispatch) => {
    console.log("deleting card")

   const { data } = await axios.delete("http://localhost:8080/api/card", card)
   
    dispatch({type: DELETE_CARD, payload: card});
}