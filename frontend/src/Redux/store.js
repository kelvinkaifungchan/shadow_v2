import {applyMiddleware, createStore, combineReducers, compose} from 'redux'
import {authReducer} from "./loginbox/reducer"
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    authStore: authReducer,
})


const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

export const store  = createStore(rootReducer,
    composeEnhancers(applyMiddleware(thunk, logger))
);