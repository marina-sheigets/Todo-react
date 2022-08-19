import { IRootReducerAction } from '../../types';
import { REGISTER_USER, SET_USER } from '../constants';

export function registerUserRequest<T>(bodyContent: T): IRootReducerAction<T> {
	return {
		type: REGISTER_USER.REQUEST,
		payload: bodyContent,
	};
}

export function setUserFail<T>(errorMessage: T): IRootReducerAction<T> {
	return {
		type: SET_USER.FAIL,
		payload: errorMessage,
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
		type: SET_USER.SUCCESS,
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
