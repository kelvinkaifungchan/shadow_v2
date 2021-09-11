import {
    ADD_DICTATIONCARD,
    ADD_FLASHCARD,
    ADD_QUIZCARD
} from "../actions/cardAction";
import {
    EDIT_DICTATIONCARD,
    EDIT_FLASHCARD,
    EDIT_QUIZCARD
} from "../actions/cardAction";
import {
    DELETE_DICTATIONCARD,
    DELETE_FLASHCARD,
    DELETE_QUIZCARD
} from "../actions/cardAction";
import {
    GETDATACARDS_SUCCESS,
    GETDATACARDS_FAILURE
} from "../actions/action"

const initialState = {
    loading: false,
    card: {
        flashcard: [],
        quizcard: [],
        dictationcard: []
    }
};

export function cardReducer(state = initialState, action) {
    switch (action.type) {
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
        case ADD_DICTATIONCARD:
            return {
                card: {
                    ...state.card,
                    dictationcard: [...state.card.dictationcard, action.payload]
                }
            };

        case ADD_FLASHCARD:
            return {
                card: {
                    ...state.card,
                    flashcard: [...state.card.flashcard, action.payload]
                }
            };

        case ADD_QUIZCARD:
            return {
                card: {
                    ...state.card,
                    quizcard: [...state.card.quizcard, action.payload]
                }
            };

        case EDIT_DICTATIONCARD:
            var newCard = action.payload;
            var newArray = state.card.dictationcard.filter((dictationcard) => dictationcard.dictationcardId !== newCard.dictationcardId);
            newArray.push(newCard)
            return {
                card: {
                    ...state.card,
                    dictationcard: newArray
                }
            }

            case EDIT_FLASHCARD:
                var newCard = action.payload;
                var newArray = state.card.flashcard.filter((flashcard) => flashcard.flashcardId !== newCard.flashcardId);
                newArray.push(newCard)
                return {
                    card: {
                        ...state.card,
                        flashcard: newArray
                    }
                }

                case EDIT_QUIZCARD:
                    var newCard = action.payload;
                    var newArray = state.card.quizcard.filter((quizcard) => quizcard.quizcardId !== newCard.quizcardId);
                    newArray.push(newCard)
                    return {
                        card: {
                            ...state.card,
                            quizcard: newArray
                        }
                    }


                    case DELETE_DICTATIONCARD:
                        return {
                            card: {
                                ...state.card,
                                dictationcard: state.card.dictationcard.filter((dictationcard) => dictationcard.dictationcardId !== action.payload.dictationcardId)
                            }
                        };
                    case DELETE_FLASHCARD:
                        return {
                            card: {
                                ...state.card,
                                flashcard: state.card.flashcard.filter((flashcard) => flashcard.flashcardId !== action.payload.flashcardId)
                            }
                        };
                    case DELETE_QUIZCARD:
                        return {
                            card: {
                                ...state.card,
                                quizcard: state.card.quizcard.filter((quizcard) => quizcard.quizcardId !== action.payload.quizcardId)
                            }
                        };

                    default:
                        return state;
    }
}