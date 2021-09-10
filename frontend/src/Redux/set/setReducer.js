import { ADD_SET } from "./setAction";
import { EDIT_SET } from "./setAction";
import { DELETE_SET } from "./setAction";

const initialState = {
    set: []
};

export function setReducer(state = initialState, action){
    switch(action.type){
        case ADD_SET:
            return {
                set: [...state.set, action.payload]
            };
        case EDIT_SET:
            var newSet = action.payload;
            var newArray = state.set.filter((set) => set.id !== newSet.id);
            return {
                set: newArray
            };
        case DELETE_SET:
            return {
                set: state.set.filter((classroom) => {
                    return set.id !== action.payload.id;
                })
            }
        default:
            return state;
        }
}