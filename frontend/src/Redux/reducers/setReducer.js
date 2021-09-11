import { ADD_SET } from "../actions/setAction";
import { EDIT_SET } from "../actions/setAction";
import { DELETE_SET } from "../actions/setAction";
import { GETDATASETS_SUCCESS, GETDATASETS_FAILURE } from "../actions/action";
import { ADD_TAG_SET, DELETE_TAG_SET } from "../actions/tagAction";

const initialState = {
    sets: []
};

export function setReducer(state = initialState, action){
    switch(action.type){
        case GETDATASETS_SUCCESS:
            return {
                ...state,
                loading: false,
                sets: action.payload
              };
        case GETDATASETS_FAILURE:
            return {
                ...state,
                loading: false,
                isAuthenticated: false
              };
        case ADD_SET:
            return {
                sets: [...state.sets, action.payload]
            };
        case EDIT_SET:
            var newSet = action.payload;
            var newArray = state.sets.filter((set) => set.id !== newSet.set_id);
            return {
                sets: newArray
            };
        case DELETE_SET:
            return {
                sets: state.sets.filter((set) => {
                    return set.id !== action.payload.set_id;
                })
            }
        case ADD_TAG_SET:
            return {
                sets: state.sets.map((set) => {
                    if(action.payload.id.setId === set.set_id){
                        return {
                            ...set, tags:[...set.tags, action.payload.content]
                        }
                    }
                    return set
                })
            }
        case DELETE_TAG_SET:
            return{
                sets: state.sets.map((set) => {
                    if(action.payload.id.setId === set.set_id){
                        return {
                            ...set, tags:set.tags.filter((tag) => tag.tagId !== action.payload.content.tagId)
                        }
                    }
                    return set
                })
            }

        default:
            return state;
        }
}