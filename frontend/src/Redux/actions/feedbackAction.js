import axios from "axios";

export const ADD_FEEDBACK_DICTATIONCARD = "ADD_FEEDBACK_DICTATIONCARD";
export const ADD_FEEDBACK_FLASHCARD = "ADD_FEEDBACK_FLASHCARD";

export const DELETE_FEEDBACK_DICTATIONCARD = "DELETE_FEEDBACK_DICTATIONCARD";
export const DELETE_FEEDBACK_FLASHCARD = "DELETE_FEEDBACK_FLASHCARD";

export const addFeedbackThunk = (feedback) => async (dispatch) => {
    return axios.post("http://localhost:8080/api/card/submission/feedback", feedback)
    .then((data) => {
        var newId = data.data[0];
        console.log("feedback ID >> ", newId)
        if (feedback.type === "dictationcard") {
            dispatch({
                type: ADD_FEEDBACK_DICTATIONCARD,
                payload: {user_id: feedback.userEmail, dictationcard_id: feedback.dictationcard_id, dictationcardSubmission_id: feedback.dictationcardSubmissionId, dictationcardFeedback_id: newId, dictationcardFeedbackBody: feedback.dictationcardFeedbackBody}
            })
        } else if (feedback.type === "flashcard") {
            dispatch({
                type: ADD_FEEDBACK_FLASHCARD,
                payload: {user_id: feedback.userEmail, flashcard_id: feedback.flashcard_id, flashcardSubmission_id: feedback.flashcardSubmissionId, flashcardFeedback_id: newId, flashcardFeedbackBody: feedback.flashcardFeedbackBody, flashcardFeedbackTime: feedback.flashcardFeedbackTime}
            })
        }
    })
    .catch(err => console.log("Error: ", err))
}

export const deleteFeedbackThunk = (feedback) => async (dispatch) => {
    return axios.delete("http://localhost:8080/api/card/submission/feedback", feedback)
    .then(response => {
        console.log(response)
        if (feedback.type === "dictationcard") {
            dispatch({
                type: DELETE_FEEDBACK_DICTATIONCARD,
                payload: {dictationcard_id: feedback.dictationcard_id, dictationcardSubmission_id: feedback.dictationcardSubmissionId, dictationcardFeedback_id: feedback.dictationcardFeedbackId}
            })
        } else if (feedback.type === "flashcard") {
            dispatch({
                type: DELETE_FEEDBACK_FLASHCARD,
                payload: {flashcard_id: feedback.flashcard_id, flashcardSubmission_id: feedback.flashcardSubmissionId, flashcardFeedback_id: feedback.flashcardFeedbackId}
            })
        }
    })
    .catch(err => console.log("Error: ", err))
}