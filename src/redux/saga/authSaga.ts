import { call, put, takeEvery } from '@redux-saga/core/effects';
import { callAPI } from '../../api';
import { AUTH_PATH, AUTH_URL, HTTP_METHODS } from '../../constants';
import { IAction } from '../../types';
import { AuthResponse } from '../../types/auth-types';
import { setUser } from '../action-creators/authActions';

function* registrationSaga(action: IAction) {
	try {
		const { email, username, password } = yield action.payload;
		const requestOptions = {
			method: HTTP_METHODS.POST,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, username, password }),
		};

		const userData: AuthResponse = yield call(
			callAPI,
			AUTH_URL + AUTH_PATH.registration,
			requestOptions
		);
		console.log(userData);
		const { user, status } = userData;

		if (status) {
			console.log(status);
		} else {
			yield put(setUser({ user, status }));
		}
	} catch (err: any) {
		console.log(err.message);
	}
}

function* loginSaga(action: IAction) {
	try {
		const { email, password } = yield action.payload;
		const requestOptions = {
			method: HTTP_METHODS.POST,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		};

		const userData: AuthResponse = yield call(
			callAPI,
			AUTH_URL + AUTH_PATH.login,
			requestOptions
		);
		localStorage.setItem('token', userData.accessToken);

		const { user, status } = userData;

		if (status) {
			console.log(status);
		} else {
			yield put(setUser({ user, status }));
		}
	} catch (err) {
		console.log(err);
	}
}

function* logoutSaga() {
	try {
		const requestOptions = {
			method: HTTP_METHODS.POST,
		};

		yield call(callAPI, AUTH_URL + AUTH_PATH.logout, requestOptions);
		localStorage.removeItem('token');
	} catch (err) {
		console.log(err);
	}
}

function* checkAuthSaga() {
	try {
		const requestOptions = {
			method: HTTP_METHODS.GET,
		};
		const response: AuthResponse = yield call(
			callAPI,
			AUTH_URL + AUTH_PATH.refresh,
			requestOptions
		);
		console.log(response);
	} catch (e) {
		console.log(JSON.stringify(e));
	}
}

function* authWatcher() {
	yield takeEvery('REGISTER_USER', registrationSaga);
	yield takeEvery('LOGIN_USER', loginSaga);
	yield takeEvery('GET_USER_AUTH', checkAuthSaga);
	yield takeEvery('LOGOUT_REQUEST', logoutSaga);
}

export default authWatcher;
