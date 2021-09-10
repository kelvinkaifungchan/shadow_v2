import axios from "axios";

export const ADD_BRIDGE_CLASSROOM_SET = "ADD_BRIDGE_CLASSROOM_SET";
export const ADD_BRIDGE_SET_DICTATIONCARD = "ADD_BRIDGE_SET_DICTATIONCARD";
export const ADD_BRIDGE_SET_FLASHCARD = "ADD_BRIDGE_SET_FLASHCARD";
export const ADD_BRIDGE_SET_QUIZCARD = "ADD_BRIDGE_SET_QUIZCARD";

export const DELETE_BRIDGE_CLASSROOM_SET = "DELETE_BRIDGE_CLASSROOM_SET";
export const DELETE_BRIDGE_SET_DICTATIONCARD = "DELETE_BRIDGE_SET_DICTATIONCARD";
export const DELETE_BRIDGE_SET_FLASHCARD = "DELETE_BRIDGE_SET_FLASHCARD";
export const DELETE_BRIDGE_SET_QUIZCARD = "DELETE_BRIDGE_SET_QUIZCARD";

export const addBridgeThunk = (bridge) => async (dispatch) => {
    return axios.post("http://localhost:8080/api/bridge", bridge)
    .then(response => {
        console.log(response)
        if (bridge.type === "classroom_set") {
            dispatch({
                type: ADD_BRIDGE_CLASSROOM_SET,
                payload: bridge
            })
        } else if (bridge.type === "set_dictationcard") {
            dispatch({
                type: ADD_BRIDGE_SET_DICTATIONCARD,
                payload: bridge
            })
        } else if (bridge.type === "set_flashcard") {
            dispatch({
                type: ADD_BRIDGE_SET_FLASHCARD,
                payload: bridge
            })
        } else if (bridge.type === "set_quizcard") {
            dispatch({
                type: ADD_BRIDGE_SET_QUIZCARD,
                payload: bridge
            })
        }
    })
    .catch(err => console.log("Error: ", err))
}

export const deleteBridgeThunk = (bridge) => async (dispatch) => {
    return axios.delete("http://localhost:8080/api/bridge", bridge)
    .then(response => {
        console.log(response)
        if (bridge.type === "classroom_set") {
            dispatch({
                type: DELETE_BRIDGE_CLASSROOM_SET,
                payload: bridge
            })
        } else if (bridge.type === "set_dictationcard") {
            dispatch({
                type: DELETE_BRIDGE_SET_DICTATIONCARD,
                payload: bridge
            })
        } else if (bridge.type === "set_flashcard") {
            dispatch({
                type: DELETE_BRIDGE_SET_FLASHCARD,
                payload: bridge
            })
        } else if (bridge.type === "set_quizcard") {
            dispatch({
                type: DELETE_BRIDGE_SET_QUIZCARD,
                payload: bridge
            })
        }
    })
    .catch(err => console.log("Error: ", err))
}