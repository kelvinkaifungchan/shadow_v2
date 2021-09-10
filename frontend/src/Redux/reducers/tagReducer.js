import { ADD_TAG } from "../actions/tagAction";
import { DELETE_TAG } from "../actions/tagAction";
import { GETDATATAGS_SUCCESS, GETDATATAGS_FAILURE } from "../actions/action";

const initialState = {
    tags: [],
};

export function tagReducer(state = initialState, action){
    switch(action.type){
        
        //Initial get
        case GETDATATAGS_SUCCESS:
            return {
              ...state,
              loading: false,
              tags: action.payload
            };
          case GETDATATAGS_FAILURE:
            return {
              ...state,
              loading: false,
              isAuthenticated: false
            };
        
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