import { ADD_CLASSROOM } from "../actions/classroomAction";
import { EDIT_CLASSROOM } from "../actions/classroomAction";
import { DELETE_CLASSROOM } from "../actions/classroomAction";
import { GETDATACLASSROOMS_SUCCESS, GETDATACLASSROOMS_FAILURE } from "../actions/action";

const initialState = {
    classroom: []
};

export function classroomReducer(state = initialState, action){
    switch(action.type){
        case GETDATACLASSROOMS_SUCCESS:
            return {
                ...state,
                loading: false,
                classroom: action.payload
              };
        case GETDATACLASSROOMS_FAILURE:
            return {
                ...state,
                loading: false,
                isAuthenticated: false
              };
        case ADD_CLASSROOM:
            return {
                classroom: [...state.classroom, action.payload]
            };
        case EDIT_CLASSROOM:
            var newClassroom = action.payload;
            var newArray = state.classroom.filter((classroom) => classroom.classroomId !== newClassroom.id);
            newArray.push(newClassroom);
            return{
                classroom: newArray
            }
        case DELETE_CLASSROOM:
            return {
                classroom: state.classroom.filter((classroom) => {
                    return classroom.id !== action.payload.id;
                })
            }
        default:
            return state;
        }
}