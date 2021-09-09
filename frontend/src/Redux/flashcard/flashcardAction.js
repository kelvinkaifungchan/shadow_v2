import axios from "axios";

export const ADD_FLASHCARD = "ADD_FlASHCARD";

export const addFlashcard = (flashcard) => async (dispatch) => {
    console.log("adding flashcard")

   const { data } = await axios.post("http://localhost:8080/api/flashcard", flashcard)
   
    dispatch({type: ADD_FLASHCARD, payload: flashcard});
}