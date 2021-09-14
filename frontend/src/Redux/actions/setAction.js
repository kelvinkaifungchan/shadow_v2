import axios from "axios";

export const ADD_SET = "ADD_SET";
export const EDIT_SET = "EDIT_SET";
export const DELETE_SET = "DELETE_SET";

export const addSet = (set) => async (dispatch) => {
    console.log("adding set" , set)
    let newId;
    await axios.post("http://localhost:8080/api/set", set)
        .then((data) => {
            newId = data.data[0]
            return newId
        })
        .then((newId) => {
            return axios.post("http://localhost:8080/api/bridge", {
                type: set.type,
                classroomId: set.classroomId,
                setId: newId
            })
        })
        .then(() => {
            dispatch({ type: ADD_SET, payload: { id: newId, description: set.description, title: set.title } });
        })
}

export const editSet = (set) => async (dispatch) => {
    console.log("editing set")

    const { data } = await axios.put("http://localhost:8080/api/set", set)

    dispatch({ type: EDIT_SET, payload: { id: set.setId, description: set.description, title: set.title } });
}

export const deleteSet = (set) => async (dispatch) => {
    console.log("deleting set")

    const { data } = await axios.delete("http://localhost:8080/api/set", set)

    dispatch({ type: DELETE_SET, payload: { id: set.setId } });
}
