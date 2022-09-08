import { IRootReducerAction } from '../../types/index';
import {
	DELETE_TODO,
	GET_TODOS,
	SET_TODOS,
	ADD_TODO,
	SET_NEW_TODO,
	UPDATE_TODO,
	CHANGE_TODOS_COMPLETED,
	CHANGE_TODO_STATUS,
	SET_SELECTED,
} from '../constants';

export function getTodosRequest<T>(): IRootReducerAction<T> {
	return {
		type: /* GET_TODOS.REQUEST */ 'GET_TODOS_REQUEST',
	};
}

export function setTodosSuccess<T>(todos: T): IRootReducerAction<T> {
	return { type: SET_TODOS.SUCCESS, payload: todos };
}

export function setTodosFail<T>(error: T): IRootReducerAction<T> {
	return {
		type: SET_TODOS.FAIL,
		payload: error,
	};
}

export function deleteTodoRequest<T>(bodyContent: T): IRootReducerAction<T> {
	return {
		type: DELETE_TODO.REQUEST,
		payload: bodyContent,
	};
}

export function addTodoRequest<T>(bodyContent: T): IRootReducerAction<T> {
	return {
		type: ADD_TODO.REQUEST,
		payload: bodyContent,
	};
}

export function setNewTodo<T>(newTodo: T): IRootReducerAction<T> {
	return {
		type: SET_NEW_TODO.SUCCESS,
		payload: newTodo,
	};
}

export function setUpdatedTodoSuccess<T>(updatedTodo: T): IRootReducerAction<T> {
	return {
		type: UPDATE_TODO.SUCCESS,
		payload: updatedTodo,
	};
}

export function deleteTodoSuccess<T>(deleteTodoId: T): IRootReducerAction<T> {
	return {
		type: DELETE_TODO.SUCCESS,
		payload: deleteTodoId,
	};
}

export function updateTodoRequest<T>(bodyContent: T): IRootReducerAction<T> {
	return { type: UPDATE_TODO.REQUEST, payload: bodyContent };
}

export function changeTodoStatusRequest<T>(bodyContent: T): IRootReducerAction<T> {
	return { type: CHANGE_TODO_STATUS.REQUEST, payload: bodyContent };
}

export function changeAllCompletedRequest<T>(bodyContent: T): IRootReducerAction<T> {
	return { type: CHANGE_TODOS_COMPLETED.REQUEST, payload: bodyContent };
}

export function changeAllCompletedSuccess<T>(bodyContent: T): IRootReducerAction<T> {
	return { type: CHANGE_TODOS_COMPLETED.SUCCESS, payload: bodyContent };
}

// for select

export function setSelected<T>(selectedOption: T): IRootReducerAction<T> {
	return {
		type: SET_SELECTED.SUCCESS,
		payload: selectedOption,
	};
}
