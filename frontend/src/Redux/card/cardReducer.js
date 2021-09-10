import { ADD_CARD } from "./cardAction";
import { EDIT_CARD } from "./cardAction";
import { DELETE_CARD } from "./cardAction";

const initialState = {
    card: {flashcard:[], quizcard:[], dictationcard:[]}
};

export function cardReducer(state = initialState, action){
    switch(action.type){
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