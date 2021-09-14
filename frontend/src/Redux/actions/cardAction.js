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

export const ADD_BRIDGE_SET_DICTATIONCARD = "ADD_BRIDGE_SET_DICTATIONCARD";
export const ADD_BRIDGE_SET_FLASHCARD = "ADD_BRIDGE_SET_FLASHCARD";
export const ADD_BRIDGE_SET_QUIZCARD = "ADD_BRIDGE_SET_QUIZCARD";

export const addCard = (card) => async (dispatch) => {
    console.log("adding card")
    let newId;
    if(card.type === "dictationcard"){
        await axios.post("http://localhost:8080/api/card", card)
    .then((data) => {
        newId = data.data[0];
        console.log("card ID", newId)
        return newId
    }).then((newId) =>{
        return axios.post("http://localhost:8080/api/bridge", {
            type: card.type,
            setId: card.setId,
            dictationcardId: newId
        })

    }).then(() => {
        dispatch({
            type: ADD_DICTATIONCARD,
            payload: {dictationcard_id: newId, user_id: card.userEmail, dictationcardTitle: card.dictationcardTitle, dictationcardRecording: card.dictationcardRecording}
        })
    }).then(() => {
        dispatch({
            type: ADD_BRIDGE_SET_DICTATIONCARD,
            payload: {id:{set_id: card.setId}, content:{dictationcard_id: newId}}
        })
    })
    }

    if(card.type === "flashcard"){
        await axios.post("http://localhost:8080/api/card", card)
    .then((data) => {
        newId = data.data[0];
        console.log("card ID", newId)
        return newId
    }).then((newId) =>{
        return axios.post("http://localhost:8080/api/bridge", {
            type: card.type,
            setId: card.setId,
            flashcardId: newId
        })

    }).then(() => {
        dispatch({
            type: ADD_FLASHCARD,
            payload: {flashcard_id: newId, user_id: card.userEmail, flashcardTitle: card.flashcardTitle, flashcardRecording: card.flashcardRecording}
        })
    }).then(() => {
        dispatch({
            type: ADD_BRIDGE_SET_FLASHCARD,
            payload: {id:{set_id: card.setId}, content:{flashcard_id: newId}}
        })
    })
    }

    if(card.type === "quizcard"){
        await axios.post("http://localhost:8080/api/card", card)
    .then((data) => {
        newId = data.data[0];
        console.log("card ID", newId)
        return newId
    }).then((newId) =>{
        return axios.post("http://localhost:8080/api/bridge", {
            type: card.type,
            setId: card.setId,
            quizcardId: newId
        })

    }).then(() => {
        dispatch({
            type: ADD_QUIZCARD,
            payload: {quizcard_id: newId, user_id: card.userEmail, quizcardTitle: card.quizcardTitle, quizcardRecording: card.quizcardRecording}
        })
    }).then(() => {
        dispatch({
            type: ADD_BRIDGE_SET_QUIZCARD,
            payload: {id:{set_id: card.setId}, content:{quizcard_id: newId}}
        })
    })
    }
   

}
 

export const editCard = (card) => async (dispatch) => {
    console.log("editing card")
    return axios.put("http://localhost:8080/api/card", card)
    .then(response => {
        console.log(response)
        if (card.type === "dictationcard") {
         dispatch({
             type: EDIT_DICTATIONCARD,
             payload: {id:{dictationcard_id: card.dictationcardId}, content:{dictationcard_id: card.dictationcardId, user_id: card.userEmail, dictationcardTitle: card.dictationcardTitle, dictationcardRecording: card.dictationcardRecording}}
         })
        }
        else if (card.type === "flashcard") {
            dispatch({
                type: EDIT_FLASHCARD,
                payload: {id:{flashcard_id: card.flashcardId}, content:{flashcard_id: card.flashcardId, user_id: card.userEmail, flashcardTitle: card.flashcardTitle, flashcardBody: card.flashcardBody, flashcardRecording: card.flashcardRecording}}
            })
           }
           else if (card.type === "quizcard") {
            dispatch({
                type: EDIT_QUIZCARD,
                payload: {id:{quizcard_id: card.quizcardId}, content:{quizcard_id: card.quizcardId, user_id: card.userEmail, quizcardTitle: card.quizcardTitle, quizcardRecording: card.quizcardRecording}}
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