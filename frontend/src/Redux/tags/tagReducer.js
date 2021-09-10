import { ADD_TAG } from "./tagAction";

const initialState = {
    tag: []
};

export function tagReducer(state = initialState, action){
    switch(action.type){
        case ADD_TAG:
            return {
                tag: [...state.tag, action.payload]
            };
        default:
            return state;
        }
}