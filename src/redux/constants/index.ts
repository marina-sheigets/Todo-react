import actionCreator from '../../utils';

export const GET_TODOS = actionCreator('GET_TODOS');
export const SET_TODOS = actionCreator('SET_TODOS');
export const SET_SELECTED = actionCreator('SET_SELECTED');

export const UPDATE_TODO = actionCreator('UPDATE_TODO');
export const SET_NEW_TODO = actionCreator('SET_NEW_TODO');
export const ADD_TODO = actionCreator('ADD_TODO');
export const DELETE_TODO = actionCreator('DELETE_TODO');
export const CHANGE_TODO_STATUS = actionCreator('CHANGE_TODO_STATUS');
export const CHANGE_TODOS_COMPLETED = actionCreator(' CHANGE_TODOS_COMPLETED');

export const REGISTER_USER = actionCreator('REGISTER_USER');
export const SET_USER = actionCreator('SET_USER');
export const LOGIN_USER = actionCreator('LOGIN_USER');
export const GET_USER_AUTH = actionCreator('GET_USER_AUTH');
export const LOGOUT = actionCreator('LOGOUT');
export const CLEAR_ERROR = actionCreator('CLEAR_ERROR');

export const NOTIFICATION = {
	ADD_TODO: 'ADD_TODO',
	DELETE_TODO: 'DELETE_TODO',
	ALL_COMPLETED_TODOS: 'ALL_COMPLETED_TODOS',
	UPDATE_TODO: 'UPDATE_TODO',
	GET_TODOS: 'GET_TODOS',
};

export const NOTIFICATION_RECEIVED = 'NOTIFICATION_RECEIVED';
