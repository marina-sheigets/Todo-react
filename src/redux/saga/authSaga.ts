import { call, put, takeEvery } from '@redux-saga/core/effects';
import { callAPI } from '../../api';
import { AUTH_PATH, AUTH_URL, BASE_URL, HTTP_METHODS } from '../../constants';
import { IAction } from '../../types';
import { AuthResponse } from '../../types/auth-types';
import { logoutUser, setUser, setUserFail } from '../action-creators/authActions';
import { GET_USER_AUTH, LOGIN_USER, LOGOUT, REGISTER_USER } from '../constants';

function* registrationSaga(action: IAction) {
	try {
		const { email, username, password } = yield action.payload;
		const requestOptions = {
			method: HTTP_METHODS.POST,
			body: JSON.stringify({ email, username, password }),
		};

		const userData: AuthResponse = yield call(
			callAPI,
			BASE_URL + AUTH_PATH.registration,
			requestOptions
		);
		const { user, status } = userData;

		if (status === 400) {
			yield put(setUserFail({ errorMessage: 'User with such email exists ' }));
		} else {
			yield put(setUser({ user, status }));
		}
	} catch (err: any) {
		console.log(JSON.stringify(err));
	}
}

function* loginSaga(action: IAction) {
	try {
		const { email, password } = yield action.payload;
		const requestOptions = {
			method: HTTP_METHODS.POST,
			body: JSON.stringify({ email, password }),
		};

		const userData: AuthResponse = yield call(
			callAPI,
			BASE_URL + AUTH_PATH.login,
			requestOptions
		);

		localStorage.setItem('token', userData.accessToken);
		const { user, status } = userData;

		yield put(setUser({ user }));
	} catch (err) {
		yield put(setUserFail({ errorMessage: 'Data is incorrect' }));
	}
}

function* logoutSaga() {
	try {
		const requestOptions = {
			method: HTTP_METHODS.POST,
		};

		yield call(callAPI, BASE_URL + AUTH_PATH.logout, requestOptions);
		localStorage.removeItem('token');
		yield put(logoutUser());
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
			BASE_URL + AUTH_PATH.refresh,
			requestOptions
		);

		localStorage.setItem('token', response.accessToken);
		const { user, status } = response;
		yield put(setUser({ user, status }));
	} catch (e) {
		console.log(e);
	}
}

function* authWatcher() {
	yield takeEvery(REGISTER_USER.REQUEST, registrationSaga);
	yield takeEvery(LOGIN_USER.REQUEST, loginSaga);
	yield takeEvery(GET_USER_AUTH.REQUEST, checkAuthSaga);
	yield takeEvery(LOGOUT.REQUEST, logoutSaga);
}

export default authWatcher;
