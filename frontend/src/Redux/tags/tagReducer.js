import { ADD_TAG } from "./tagAction";
import { DELETE_TAG } from "./tagAction";

const initialState = {
    tag: [],
};

export function tagReducer(state = initialState, action){
    switch(action.type){
        case ADD_TAG:
                return {
                    tag: [...state.tag, action.payload]
                };
            
        case DELETE_TAG:
            return{
                tag: state.tag.filter((tag) => {
                    return tag.id !== action.payload.id
                })
            }
        default:
            return state;
        }
}