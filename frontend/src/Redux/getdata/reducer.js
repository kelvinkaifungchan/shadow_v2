import {
  GETDATA_REQUEST,
  GETDATA_SUCCESS,
  GETDATA_FAILURE,
} from "./action";

const initialState = {
  error: "",
  loading: false,
  data: [],
};

export function dataReducer(state = initialState, action) {
  switch (action.type) {
    case GETDATA_REQUEST:
      return { ...state, loading: true, error: false };
    case GETDATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
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

