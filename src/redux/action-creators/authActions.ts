import { IRootReducerAction } from '../../types';

export function registerUserRequest<T>(bodyContent: T): IRootReducerAction<T> {
	return {
		type: 'REGISTER_USER',
		payload: bodyContent,
	};
}

export function loginUserRequest<T>(bodyContent: T): IRootReducerAction<T> {
	return {
		type: 'LOGIN_USER',
		payload: bodyContent,
	};
}

export function setUser<T>(payload: T): IRootReducerAction<T> {
	return {
		type: 'SET_USER',
		payload,
	};
}

export function checkUserAuth<T>(): IRootReducerAction<T> {
	return {
		type: 'GET_USER_AUTH',
	};
}

export function logoutUser<T>(): IRootReducerAction<T> {
	return {
		type: 'LOGOUT_REQUEST',
	};
}
