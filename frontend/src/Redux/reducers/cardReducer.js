import { ADD_CARD } from "./cardAction";
import { EDIT_CARD } from "./cardAction";
import { DELETE_CARD } from "./cardAction";
import { GETDATACARDS_SUCCESS, GETDATACARDS_FAILURE } from "../actions/action"

const initialState = {
    loading: false,
    card: []
};

export function cardReducer(state = initialState, action){
    switch(action.type){
        case GETDATACARDS_SUCCESS:
            return {
                ...state,
                loading: false,
                card: action.payload
              };
        case GETDATACARDS_FAILURE:
            return {
                ...state,
                loading: false,
                isAuthenticated: false
              };
        case ADD_CARD:
            if(action.payload.type === "flashcard")
            return {
                card: {...state.card, flashcard:[...state.card.flashcard, action.payload]}
            };
        case EDIT_CARD:
            return {

            }
        case DELETE_CARD:
            return {

            }
        default:
            return state;
        }
}