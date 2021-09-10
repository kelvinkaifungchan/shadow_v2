import axios from "axios";

export const ADD_SUBMISSION_DICTATIONCARD = "ADD_SUBMISSION_DICTATIONCARD";
export const ADD_SUBMISSION_FLASHCARD = "ADD_SUBMISSION_FLASHCARD";
export const ADD_SUBMISSION_QUIZCARD = "ADD_SUBMISSION_QUIZCARD";

export const DELETE_SUBMISSION_DICTATIONCARD = "DELETE_SUBMISSION_DICTATIONCARD";
export const DELETE_SUBMISSION_FLASHCARD = "DELETE_SUBMISSION_FLASHCARD";
export const DELETE_SUBMISSION_QUIZCARD = "DELETE_SUBMISSION_QUIZCARD";

export const addSubmissionThunk = (submission) => async (dispatch) => {
    return axios.post("http://localhost:8080/api/card/submission", submission)
    .then(response => {
        console.log(response)
        if (submission.type === "dictationcard") {
            dispatch({
                type: ADD_SUBMISSION_DICTATIONCARD,
                payload: submission
            })
        } else if (submission.type === "flashcard") {
            dispatch({
                type: ADD_SUBMISSION_FLASHCARD,
                payload: submission
            })
        } else if (submission.type === "quizcard") {
            dispatch({
                type: ADD_SUBMISSION_QUIZCARD,
                payload: submission
            })
        }
    })
    .catch(err => console.log("Error: ", err))
}

export const deleteSubmissionThunk = (submission) => async (dispatch) => {
    return axios.delete("http://localhost:8080/api/card/submission", submission)
    .then(response => {
        console.log(response)
        if (submission.type === "dictationcard") {
            dispatch({
                type: DELETE_SUBMISSION_DICTATIONCARD,
                payload: submission
            })
        } else if (submission.type === "flashcard") {
            dispatch({
                type: DELETE_SUBMISSION_FLASHCARD,
                payload: submission
            })
        } else if (submission.type === "quizcard") {
            dispatch({
                type: DELETE_SUBMISSION_QUIZCARD,
                payload: submission
            })
        }
    })
    .catch(err => console.log("Error: ", err))
}