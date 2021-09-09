import {
  GETDATA_REQUEST,
  GETDATA_SUCCESS,
  GETDATA_FAILURE,
} from "./action";

const initialState = {
  error: "",
  loading: false,
  user: [],
  classrooms: [],
  sets: [],
  cards: []
};

export function dataReducer(state = initialState, action) {
  switch (action.type) {
    case GETDATA_REQUEST:
      return { ...state, loading: true, error: false };
    case GETDATA_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        classrooms: action.payload.classrooms,
        sets: action.payload.sets,
        cards: action.payload.cards,
        tags: action.payload.tags,
      };
    case GETDATA_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
}

