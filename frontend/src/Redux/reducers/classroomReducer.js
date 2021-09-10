import { ADD_CLASSROOM } from "../actions/classroomAction";
import { EDIT_CLASSROOM } from "../actions/classroomAction";
import { DELETE_CLASSROOM } from "../actions/classroomAction";
import { GETDATACLASSROOMS_SUCCESS, GETDATACLASSROOMS_FAILURE } from "../actions/action";
import { ADD_TAG_CLASSROOM, DELETE_TAG_CLASSROOM } from "../actions/tagAction";

const initialState = {
    classrooms: []
};

export function classroomReducer(state = initialState, action){
    switch(action.type){
        case GETDATACLASSROOMS_SUCCESS:
            return {
                ...state,
                loading: false,
                classrooms: action.payload
              };
        case GETDATACLASSROOMS_FAILURE:
            return {
                ...state,
                loading: false,
                isAuthenticated: false
              };
        case ADD_CLASSROOM:
            return {
                classrooms: [...state.classrooms, action.payload]
            };
        case EDIT_CLASSROOM:
            var newClassroom = action.payload;
            var newArray = state.classrooms.filter((classroom) => classroom.id !== newClassroom.classroom_id);
            newArray.push(newClassroom);
            return{
                classrooms: newArray
            }
        case DELETE_CLASSROOM:
            return {
                classrooms: state.classrooms.filter((classroom) => {
                    return classroom.id !== action.payload.classroom_id;
                })
            }
        case ADD_TAG_CLASSROOM:
            return {
                classrooms: state.classrooms.map((classroom) => {
                    if(action.payload.id.classroomId == classroom.classroom_id){
                        return {
                            ...classroom, tags:[...classroom.tags, action.payload.content]
                        }
                    }
                    return classroom
                })
            }

        case DELETE_TAG_CLASSROOM:
            return{
                classrooms: state.classrooms.map((classroom) => {
                    if(action.payload.id.classroomId == classroom.classroom_id){
                        return {
                            ...classroom, tags:classroom.tags.filter((tag) => tag.tagId !== action.payload.content.tagId)
                        }
                    }
                    return classroom
                })
            }

        default:
            return state;
        }
}