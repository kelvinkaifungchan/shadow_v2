import { ADD_CARD } from "./cardAction";
import { EDIT_CARD } from "./cardAction";
import { DELETE_CARD } from "./cardAction";
import { GETDATACARDS_SUCCESS, GETDATACARDS_FAILURE } from "../actions/action"

const initialState = {
    loading: false,
    card: {flashcard:[], quizcard:[], dictationcard:[]}
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
            if(action.payload.type === "flashcard"){
                return {
                    card: {...state.card, flashcard:[...state.card.flashcard, action.payload]}
                };
            }
            if(action.payload.type === "quizcard"){
                return {
                    card: {...state.card, quizcard:[...state.card.quizcard, action.payload]}
                };
            }
            if(action.payload.type === "dictationcard"){
                return {
                    card: {...state.card, dictationcard:[...state.card.dictationcard, action.payload]}
                };
            }

        case EDIT_CARD:
            var newCard = action.payload;
            if(action.payload.type == "flashcard"){
                var newArray = state.card.flashcard.filter((flashcard) => flashcard.flashcardId !== newCard.flashcardId);
                newArray.push(newCard)
                return {
                    card: {...state.card, flashcard: newArray}
                }
            }
            if(action.payload.type == "quizcard"){
                var newArray = state.card.quizcard.filter((quizcard) => quizcard.quizcardId !== newCard.quizcardId);
                newArray.push(newCard)
                return {
                    card: {...state.card, quizcard: newArray}
                }
            }
            if(action.payload.type == "dictationcard"){
                var newArray = state.card.dictationcard.filter((dictationcard) => dictationcard.dictationcardId !== newCard.dictationcardId);
                newArray.push(newCard)
                return {
                    card: {...state.card, dictationcard: newArray}
                }
            }

        case DELETE_CARD:
            if(action.payload.type === "flashcard"){
                return {
                    card: {...state.card, flashcard:state.card.flashcard.filter((flashcard) => flashcard.flashcardId !== action.payload.flashcardId)}
                };
            }
            if(action.payload.type === "quizcard"){
                return {
                    card: {...state.card, quizcard:state.card.quizcard.filter((quizcard) => quizcard.quizcardId !== action.payload.quizcardId)}
                };
            }
            if(action.payload.type === "dictationcard"){
                return {
                    card: {...state.card, dictationcard:state.card.dictationcard.filter((dictationcard) => dictationcard.dictationcardId !== action.payload.dictationcardId)}
                };
            }

        default:
            return state;
        }
}