import { ADD_CARD } from "./cardAction";
import { EDIT_CARD } from "./cardAction";
import { DELETE_CARD } from "./cardAction";

const initialState = {
    card: []
};

export function cardReducer(state = initialState, action){
    switch(action.type){
        case ADD_CARD:
            return {
                card: [...state.card, action.payload]
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