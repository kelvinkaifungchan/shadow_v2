import { ADD_SET } from "./setAction";

const initialState = {
    set: []
};

export function setReducer(state = initialState, action){
    switch(action.type){
        case ADD_SET:
            return {
                set: [...state.set, action.payload]
            };
        default:
            return state;
        }
}