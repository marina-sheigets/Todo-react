import { call, put, takeEvery } from '@redux-saga/core/effects';
import { callAPI } from '../../api';
import { AUTH_PATH, AUTH_URL, HTTP_METHODS } from '../../constants';
import { IAction } from '../../types';
import { AuthResponse } from '../../types/auth-types';
import { setUser, setUserFail } from '../action-creators/authActions';

function* registrationSaga(action: IAction) {
	try {
		const { email, username, password } = yield action.payload;
		const requestOptions = {
			method: HTTP_METHODS.POST,
			body: JSON.stringify({ email, username, password }),
		};

		const userData: AuthResponse = yield call(
			callAPI,
			AUTH_URL + AUTH_PATH.registration,
			requestOptions
		);
		console.log(userData);
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
		const { email, username, password } = yield action.payload;
		const requestOptions = {
			method: HTTP_METHODS.POST,
			body: JSON.stringify({ email, username, password }),
		};

		const userData: AuthResponse = yield call(
			callAPI,
			AUTH_URL + AUTH_PATH.login,
			requestOptions
		);
		localStorage.setItem('token', userData.accessToken);

		const { user, status } = userData;

		if (status) {
			console.log(userData);
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
		const response: AuthResponse = yield call(callAPI, AUTH_URL + AUTH_PATH.refresh);

		localStorage.setItem('token', response.accessToken);
		const { user, status } = response;
		yield put(setUser({ user, status }));
	} catch (e) {
		console.log(typeof e);
	}
}

function* authWatcher() {
	yield takeEvery('REGISTER_USER', registrationSaga);
	yield takeEvery('LOGIN_USER', loginSaga);
	yield takeEvery('GET_USER_AUTH', checkAuthSaga);
	yield takeEvery('LOGOUT_REQUEST', logoutSaga);
}

export default authWatcher;
