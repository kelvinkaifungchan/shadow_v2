import axios from "axios";

export const ADD_DICTATIONCARD = "ADD_DICTATIONCARD";
export const ADD_FLASHCARD = "ADD_FLASHCARD";
export const ADD_QUIZCARD = "ADD_QUIZCARD";

export const EDIT_DICTATIONCARD = "EDIT_DICTATIONCARD";
export const EDIT_FLASHCARD = "EDIT_FLASHCARD";
export const EDIT_QUIZCARD = "EDIT_QUIZCARD";

export const DELETE_DICTATIONCARD = "DELETE_DICTATIONCARD";
export const DELETE_FLASHCARD = "DELETE_FLASHCARD";
export const DELETE_QUIZCARD = "DELETE_QUIZCARD";

export const addCard = (card) => async (dispatch) => {
    console.log("adding card")
   return axios.post("http://localhost:8080/api/card", card)
   .then(response => {
       console.log("card Response",response)
       if (card.type === "dictationcard") {
        dispatch({
            type: ADD_DICTATIONCARD,
            payload: {user_id: card.userEmail, dictationcardTitle: card.dictationcardTitle, dictationcardRecording: card.dictationcardRecording}
        })
       }
       else if (card.type === "quizcard") {
        dispatch({
            type: ADD_FLASHCARD,
            payload: {user_id: card.userEmail, flashcardTitle: card.flashcardTitle, flashcardBody: card.flashcardBody, flashcardRecording: card.flashcardRecording}
        })
       }
       else if (card.type === "quizcard") {
        dispatch({
            type: ADD_QUIZCARD,
            payload: {user_id: card.userEmail, quizcardTitle: card.quizcardTitle, quizcardRecording: card.quizcardRecording}
        })
       }
   })
}

export const editCard = (card) => async (dispatch) => {
    console.log("editing card")
    return axios.put("http://localhost:8080/api/card", card)
    .then(response => {
        console.log(response)
        if (card.type === "dictationcard") {
         dispatch({
             type: EDIT_DICTATIONCARD,
             payload: {id:{quizcard_id: card.quizcardId}, content:{user_id: card.userEmail, dictationcardTitle: card.dictationcardTitle, dictationcardRecording: card.dictationcardRecording}}
         })
        }
        else if (card.type === "flashcard") {
            dispatch({
                type: EDIT_FLASHCARD,
                payload: {id:{quizcard_id: card.quizcardId}, content:{user_id: card.userEmail, flashcardTitle: card.flashcardTitle, flashcardBody: card.flashcardBody, flashcardRecording: card.flashcardRecording}}
            })
           }
           else if (card.type === "quizcard") {
            dispatch({
                type: EDIT_QUIZCARD,
                payload: {id:{quizcard_id: card.quizcardId}, content:{user_id: card.userEmail, quizcardTitle: card.quizcardTitle, quizcardRecording: card.quizcardRecording}}
            })
           }
    })
}

export const deleteCard = (card) => async (dispatch) => {
    console.log("deleting card")
    return axios.delete("http://localhost:8080/api/card", card)
    .then(response => {
        console.log(response)
        if (card.type === "dictationcard") {
         dispatch({
             type: DELETE_DICTATIONCARD,
             payload: {dictationcard_id: card.dictationcardId}
         })
        }
        else if (card.type === "flashcard") {
            dispatch({
                type: DELETE_FLASHCARD,
                payload: {flashcard_id: card.flashcardId}
            })
           }
           else if (card.type === "quizcard") {
            dispatch({
                type: DELETE_QUIZCARD,
                payload: {quizcard_id: card.quizcardId}
            })
           }
    })
}