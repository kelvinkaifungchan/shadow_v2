import { ADD_SET } from "../actions/setAction";
import { EDIT_SET } from "../actions/setAction";
import { DELETE_SET } from "../actions/setAction";
import { GETDATASETS_SUCCESS, GETDATASETS_FAILURE } from "../actions/action";

const initialState = {
    set: []
};

export function setReducer(state = initialState, action){
    switch(action.type){
        case GETDATASETS_SUCCESS:
            return {
                ...state,
                loading: false,
                set: action.payload
              };
        case GETDATASETS_FAILURE:
            return {
                ...state,
                loading: false,
                isAuthenticated: false
              };
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
                set: state.set.filter((set) => {
                    return set.id !== action.payload.id;
                })
            }
        default:
            return state;
        }
}