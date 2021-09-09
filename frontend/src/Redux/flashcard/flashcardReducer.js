import { ADD_FLASHCARD } from "./flashcardAction";

const initialState = {
    flashcard: []
};

export function flashcardReducer(state = initialState, action){
    switch(action.type){
        case ADD_FLASHCARD:
            return {
                classroom: [...state.flashcard, action.flashcard]
            };
        default:
            return state;
        }
}