import { IRootReducerAction } from './../../types/index';
import {
	DELETE_TODO,
	GET_TODOS,
	ADD_TODO,
	UPDATE_TODO_REQUEST,
	CHANGE_TODO_COMPLETED,
	CHANGE_TODO_STATUS,
	SET_SELECTED,
} from '../../constants';

export function setTodosRequest<T>(): IRootReducerAction<T> {
	return {
		type: GET_TODOS.REQUEST,
	};
}

export function setTodosSuccess<T>(todos: T): IRootReducerAction<T> {
	return { type: GET_TODOS.SUCCESS, payload: todos };
}

export function setTodosFail<T>(error: T): IRootReducerAction<T> {
	return {
		type: GET_TODOS.FAIL,
		payload: error,
	};
}

export function deleteTodoRequest<T>(bodyContent: T): IRootReducerAction<T> {
	return {
		type: DELETE_TODO,
		payload: bodyContent,
	};
}

export function addTodoRequest<T>(bodyContent: T): IRootReducerAction<T> {
	return {
		type: ADD_TODO,
		payload: bodyContent,
	};
}

export function updateTodoRequest<T>(bodyContent: T): IRootReducerAction<T> {
	return { type: UPDATE_TODO_REQUEST, payload: bodyContent };
}

export function changeTodoStatusRequest<T>(bodyContent: T): IRootReducerAction<T> {
	return { type: CHANGE_TODO_STATUS, payload: bodyContent };
}

export function changeAllCompletedRequest<T>(bodyContent: T): IRootReducerAction<T> {
	return { type: CHANGE_TODO_COMPLETED, payload: bodyContent };
}

// for select

export function setSelected<T>(selectedOption: T): IRootReducerAction<T> {
	return {
		type: SET_SELECTED.SUCCESS,
		payload: selectedOption,
	};
}
