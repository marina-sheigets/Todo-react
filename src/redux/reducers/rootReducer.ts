import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import todosReducer from './todosReducer';
const rootReducer = combineReducers({ todos: todosReducer, auth: authReducer /*userReducer*/ });
export default rootReducer;
