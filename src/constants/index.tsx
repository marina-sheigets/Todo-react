import actionCreator from '../utils';

export const URL = 'http://localhost:3030/todos';

export const OPTIONS = {
	all: 'All',
	active: 'Active',
	completed: 'Completed',
};

export const HTTP_METHODS = {
	GET: 'GET',
	POST: 'POST',
	DELETE: 'DELETE',
	PATCH: 'PATCH',
	OPTIONS: 'OPTIONS',
};

export const GET_TODOS = actionCreator('GET_TODOS');
export const SET_SELECTED = actionCreator('SET_SELECTED');

export const UPDATE_TODO_REQUEST = 'UPDATE_TODO_REQUEST';
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const CHANGE_TODO_STATUS = 'CHANGE_TODO_STATUS';
export const CHANGE_TODO_COMPLETED = 'CHANGE_TODO_COMPLETED';
