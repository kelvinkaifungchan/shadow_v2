import { GETDATAUSER_SUCCESS, GETDATAUSER_FAILURE } from "../actions/action";

const initialState = {
    user: [],
};

export function userReducer(state = initialState, action){
    switch(action.type){
        
        //Initial get
        case GETDATAUSER_SUCCESS:
            return {
              ...state,
              loading: false,
              user: action.payload
            };
          case GETDATAUSER_FAILURE:
            return {
              ...state,
              loading: false,
              isAuthenticated: false
            };
        
        default:
            return state;
        }
}