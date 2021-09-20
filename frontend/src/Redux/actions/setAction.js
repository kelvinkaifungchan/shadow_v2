import axios from "axios";

export const ADD_SET = "ADD_SET";
export const EDIT_SET = "EDIT_SET";
export const DELETE_SET = "DELETE_SET";

export const ADD_BRIDGE_CLASSROOM_SET = "ADD_BRIDGE_CLASSROOM_SET";

export const addSet = (set) => async (dispatch) => {
    console.log("adding set", set)
    console.log('set in action', set)
    const { data } = await axios.post("http://localhost:8080/api/set", set)
    const newId = data[0]
    console.log('this is the set post return', newId)
    if (set.classroomId === null || set.classroomId === undefined) {
        console.log('set.classroom null')
        dispatch({ type: ADD_SET, payload: { id: newId, description: set.desc, title: set.title } });
    } else {
        const bridge = await axios.post("http://localhost:8080/api/bridge", {
            type: set.type,
            classroomId: set.classroomId,
            setId: newId
        })
        console.log('newId in ', newId)
        const newBridge = bridge.data
        console.log('newbridge', newBridge)
        console.log('bridge', newBridge[0])
        dispatch({ type: ADD_SET, payload: { id: newId, description: set.desc, title: set.title } });
        dispatch({
            type: ADD_BRIDGE_CLASSROOM_SET,
            payload: { id: { classroom_id: set.classroomId }, content: { set_id: newBridge[0] } }
        })
    }
    console.log('post dispatch')

}

export const editSet = (set) => async (dispatch) => {
    console.log("editing set")

    const { data } = await axios.put("http://localhost:8080/api/set", set)

    dispatch({ type: EDIT_SET, payload: { id: set.setId, description: set.description, title: set.title } });
}

export const deleteSet = (set) => async (dispatch) => {
    console.log("deleting set")

    await axios.post("http://localhost:8080/api/set/delete", set)
        .then(() => {
            dispatch({ type: DELETE_SET, payload: { set_id: set.id } });
        })
        .then(() => {
            
        })

}

export const addSetBridge = (set) => async (dispatch) => {
    // console.log("adding set" , set)
    // const { data } = await axios.post("http://localhost:8080/api/set", set)
    // const newId = data[0]
    // console.log('addSetBridge MDP newId', newId)
    // console.log('this is the set post return', newId)
    // dispatch({ type: ADD_SET, payload: { id: newId, description: set.desc, title: set.title} });
    // console.log('post dispatch')
    console.log(set)
    const { bridge } = await axios.post("http://localhost:8080/api/bridge", {
        type: set.type,
        classroomId: set.classroomId,
        setId: set.setId,
    })
    const newBridge = bridge[0]
    console.log('addSetBridge MDP bridge', bridge)
    dispatch({
        type: ADD_BRIDGE_CLASSROOM_SET,
        payload: { id: { classroom_id: set.classroomId }, content: { set_id: set.setId } }
    })
}