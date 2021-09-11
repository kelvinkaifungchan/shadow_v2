import axios from "axios";

export const ADD_SUBMISSION_DICTATION = "ADD_SUBMISSION_DICTATIONCARD";
export const ADD_SUBMISSION_FLASHCARD = "ADD_SUBMISSION_FLASHCARD";
export const ADD_SUBMISSION_MULTIPLECHOICE = "ADD_SUBMISSION_MULTIPLECHOICE";
export const ADD_SUBMISSION_TRUEFALSE = "ADD_SUBMISSION_TRUEFALSE";

export const DELETE_SUBMISSION_DICTATION = "DELETE_SUBMISSION_DICTATIONCARD";
export const DELETE_SUBMISSION_FLASHCARD = "DELETE_SUBMISSION_FLASHCARD";
export const DELETE_SUBMISSION_MULTIPLECHOICE = "DELETE_SUBMISSION_MULTIPLECHOICE";
export const DELETE_SUBMISSION_TRUEFALSE = "DELETE_SUBMISSION_TRUEFALSE";

export const addSubmissionThunk = (submission) => async (dispatch) => {
    return axios.post("http://localhost:8080/api/card/submission", submission)
    .then(response => {
        console.log(response)
        if (submission.type === "dictation") {
            dispatch({
                type: ADD_SUBMISSION_DICTATION,
                payload: {user_id: submission.userId, dictation_id: submission.dictationId, dictationSubmissionPath: submission.dictationSubmissionPath, dictationSubmissionStatus: true}
            })
        } else if (submission.type === "flashcard") {
            dispatch({
                type: ADD_SUBMISSION_FLASHCARD,
                payload: {user_id: submission.userId, flashcard_id: submission.flashcardId, flashcardSubmissionRecording: submission.flashcardSubmissionRecording, flashcardSubmissionStatus: true}
            })
        } else if (submission.type === "multipleChoice") {
            dispatch({
                type: ADD_SUBMISSION_MULTIPLECHOICE,
                payload: {user_id: submission.userId, multipleChoice_id: submission.multipleChoiceId, multipleChoiceSubmission: submission.multipleChoiceSubmission, multipleChoiceMarking: submission.multipleChoiceMarking, multipleChoiceStatus: true}
            })
        } else if (submission.type === "trueFalse") {
            dispatch({
                type: ADD_SUBMISSION_TRUEFALSE,
                payload: { user_id: user_id[0].id, trueFalse_id: submission.trueFalseId, trueFalseSubmission: submission.trueFalseSubmission, trueFalseMarking: submission.trueFalseMarking, trueFalseSubmissionStatus: true}
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
                payload: {dictationSubmission_id: submission.dictationSubmissionId}
            })
        } else if (submission.type === "flashcard") {
            dispatch({
                type: DELETE_SUBMISSION_FLASHCARD,
                payload: {flashcardSubmission_id: submission.flashcardSubmissionId}
            })
        } else if (submission.type === "multipleChoice") {
            dispatch({
                type: DELETE_SUBMISSION_MULTIPLECHOICE,
                payload: {multiplechoiceSubmission_id: submission.multiplechoiceSubmissionId}
            })
        } else if (submission.type === "trueFalse") {
            dispatch({
                type: DELETE_SUBMISSION_TRUEFALSE,
                payload: {truefalseSubmission_id: submission.truefalseSubmissionId}
            })
        }
    })
    .catch(err => console.log("Error: ", err))
}