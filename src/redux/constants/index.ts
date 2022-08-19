import actionCreator from '../../utils';

export const GET_TODOS = actionCreator('GET_TODOS');
export const SET_TODOS = actionCreator('SET_TODOS');
export const SET_SELECTED = actionCreator('SET_SELECTED');

export const UPDATE_TODO = actionCreator('UPDATE_TODO');
export const ADD_TODO = actionCreator('ADD_TODO');
export const DELETE_TODO = actionCreator('DELETE_TODO');
export const CHANGE_TODO_STATUS = actionCreator('CHANGE_TODO_STATUS');
export const CHANGE_TODO_COMPLETED = actionCreator('CHANGE_TODO_COMPLETED');

export const REGISTER_USER = actionCreator('REGISTER_USER');
export const SET_USER = actionCreator('SET_USER');
export const LOGIN_USER = actionCreator('LOGIN_USER');
export const GET_USER_AUTH = actionCreator('GET_USER_AUTH');
export const LOGOUT = actionCreator('LOGOUT');
