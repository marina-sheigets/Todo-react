import { combineReducers } from '@reduxjs/toolkit';
import todosReducer from './todosReducer';
const rootReducer = combineReducers({ todosReducer /*userReducer*/ });
export default rootReducer;
