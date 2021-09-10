import { ADD_FLASHCARD } from "./cardAction";
import { ADD_QUIZCARD } from "./cardAction";
import { ADD_DICTATIONCARD } from "./cardAction";

import { EDIT_FLASHCARD } from "./cardAction";
import { EDIT_QUIZCARD } from "./cardAction";
import { EDIT_DICTATIONCARD } from "./cardAction";

import { DELETE_FLASHCARD } from "./cardAction";
import { DELETE_QUIZCARD } from "./cardAction";
import { DELETE_DICTATIONCARD } from "./cardAction";


import { GETDATACARDS_SUCCESS, GETDATACARDS_FAILURE } from "../actions/action"

const initialState = {
    loading: false,
    cards: {flashcard:[], quizcard:[], dictationcard:[]}
};

export function cardReducer(state = initialState, action){
    switch(action.type){
        case GETDATACARDS_SUCCESS:  
            return {
                ...state,
                loading: false,
                cards: action.payload
              };
        case GETDATACARDS_FAILURE:
            return {
                ...state,
                loading: false,
                isAuthenticated: false
              };
        case ADD_FLASHCARD:
                return {
                    cards: {...state.cards, flashcard:[...state.cards.flashcard, action.payload]}
                };

        case ADD_QUIZCARD:
                return {
                    cards: {...state.cards, quizcard:[...state.cards.quizcard, action.payload]}
                };
        case ADD_DICTATIONCARD:
                return {
                    cards: {...state.cards, dictationcard:[...state.cards.dictationcard, action.payload]}
                };
            

        case EDIT_FLASHCARD:
            var newCard = action.payload;
            var newArray = state.cards.flashcard.filter((flashcard) => flashcard.flashcardId !== newCard.flashcardId);
            newArray.push(newCard)
            return {
                cards: {...state.cards, flashcard: newArray}
            }
            
        case EDIT_QUIZCARD:
            var newCard = action.payload;
            var newArray = state.cards.quizcard.filter((quizcard) => quizcard.quizcardId !== newCard.quizcardId);
            newArray.push(newCard)
            return {
                cards: {...state.cards, quizcard: newArray}
            }
            
        case EDIT_DICTATIONCARD:
            var newCard = action.payload;
            var newArray = state.cards.dictationcard.filter((dictationcard) => dictationcard.dictationcardId !== newCard.dictationcardId);
            newArray.push(newCard)
            return {
                cards: {...state.cards, dictationcard: newArray}
            }
            

        case DELETE_FLASHCARD:
            return {
                cards: {...state.cards, flashcard:state.cards.flashcard.filter((flashcard) => flashcard.flashcardId !== action.payload.flashcardId)}
            };
            
        case DELETE_QUIZCARD:
            return {
                cards: {...state.cards, quizcard:state.cards.quizcard.filter((quizcard) => quizcard.quizcardId !== action.payload.quizcardId)}
            };
            
        case DELETE_DICTATIONCARD:
            return {
                cards: {...state.cards, dictationcard:state.cards.dictationcard.filter((dictationcard) => dictationcard.dictationcardId !== action.payload.dictationcardId)}
            };
            
        default:
            return state;
        }
}