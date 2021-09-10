import {applyMiddleware, createStore, combineReducers, compose} from 'redux'
import {authReducer} from "./loginbox/reducer"
import {dataReducer} from "./getdata/reducer"
import {classroomReducer} from './classroom/classroomReducer'

import logger from 'redux-logger';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    authStore: authReducer,
    dataStore: dataReducer,
    classroomStore: classroomReducer,
})


const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

export const store  = createStore(rootReducer,
    composeEnhancers(applyMiddleware(thunk, logger))
);