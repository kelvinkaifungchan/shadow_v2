import { ADD_CLASSROOM } from "./classroomAction";

const initialState = {
    classroom: []
};

export function classroomReducer(state = initialState, action){
    console.log(action, '<<<<<<<action clas')
    switch(action.type){
        case ADD_CLASSROOM:
            return {
                classroom: [...state.classroom, action.classroom]
            };
        default:
            return state;
        }
}