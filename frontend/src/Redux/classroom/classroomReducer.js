import { ADD_CLASSROOM } from "./classroomAction";
import { EDIT_CLASSROOM } from "./classroomAction";
import { DELETE_CLASSROOM } from "./classroomAction";

const initialState = {
    classroom: []
};

export function classroomReducer(state = initialState, action){
    switch(action.type){
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