import { takeEvery, select, put, call } from 'redux-saga/effects';
import {
	GET_TODOS,
	DELETE_TODO,
	ADD_TODO,
	UPDATE_TODO,
	CHANGE_TODO_COMPLETED,
	CHANGE_TODO_STATUS,
} from '../constants';
import { BASE_URL, HTTP_METHODS } from '../../constants';
import { setTodosFail, setTodosSuccess } from '../action-creators/todoActions';
import { IAction, ResponseGenerator } from '../../types';
import { callAPI } from '../../api';
import { getSelectedOption } from '../selectors/todosSelector';
import { getURL } from '../../utils';
import { getUserID } from '../selectors/authSelector';
import { AuthResponse } from '../../types/auth-types';

function* getTodosSaga() {
	try {
		const selectedOption: ResponseGenerator = yield select(getSelectedOption);
		const userID: AuthResponse = yield select(getUserID);
		const TODOS_URL = getURL(selectedOption, String(userID));

		const requestOptions = {
			method: HTTP_METHODS.GET,
		};

		const todos: ResponseGenerator = yield call(callAPI, TODOS_URL, requestOptions);
		yield put(setTodosSuccess(todos));
	} catch (error) {
		let message = 'Unknown Error';
		if (error instanceof Error) message = error.message;
		yield put(setTodosFail(message));
	}
}

function* deleteTodoSaga(action: IAction) {
	try {
		const selectedOption: ResponseGenerator = yield select(getSelectedOption);
		const id = action.payload;

		const TODOS_URL = getURL(selectedOption, id);
		const userID: AuthResponse = yield select(getUserID);

		const requestOptions = {
			method: HTTP_METHODS.DELETE,
			body: JSON.stringify({ userID: userID }),
		};

		const todos: ResponseGenerator = yield call(callAPI, TODOS_URL, requestOptions);
		yield put(setTodosSuccess(todos));
	} catch (error) {
		let message = 'Unknown Error';
		if (error instanceof Error) message = error.message;
		yield put(setTodosFail(message));
	}
}

function* addTodoSaga(action: IAction) {
	try {
		const selectedOption: ResponseGenerator = yield select(getSelectedOption);
		const title = action.payload;
		const TODOS_URL = getURL(selectedOption);
		const userID: AuthResponse = yield select(getUserID);

		const requestOptions = {
			method: HTTP_METHODS.POST,
			body: JSON.stringify({ title, userID }),
		};
		const todos: ResponseGenerator = yield call(callAPI, TODOS_URL, requestOptions);
		yield put(setTodosSuccess(todos));
	} catch (error) {
		let message = 'Unknown Error';
		if (error instanceof Error) message = error.message;
		yield put(setTodosFail(message));
	}
}

function* updateTodoSaga(action: IAction) {
	try {
		const selectedOption: ResponseGenerator = yield select(getSelectedOption);
		const { id, title } = yield action.payload;
		const TODOS_URL = getURL(selectedOption, id);
		const userID: AuthResponse = yield select(getUserID);

		const requestOptions = {
			method: HTTP_METHODS.PATCH,
			body: JSON.stringify({ title, userID }),
		};
		const todos: ResponseGenerator = yield call(callAPI, TODOS_URL, requestOptions);
		yield put(setTodosSuccess(todos));
	} catch (error) {
		let message = 'Unknown Error';
		if (error instanceof Error) message = error.message;
		yield put(setTodosFail(message));
	}
}

function* changeTodoStatusSaga(action: IAction) {
	try {
		const selectedOption: ResponseGenerator = yield select(getSelectedOption);
		const { id } = yield action.payload;
		const TODOS_URL = getURL(selectedOption, id);
		const userID: AuthResponse = yield select(getUserID);

		const requestOptions = {
			method: HTTP_METHODS.PATCH,
			body: JSON.stringify({ changeStatus: 'true', userID }),
		};
		const todos: ResponseGenerator = yield call(callAPI, TODOS_URL, requestOptions);
		yield put(setTodosSuccess(todos));
	} catch (error) {
		let message = 'Unknown Error';
		if (error instanceof Error) message = error.message;
		yield put(setTodosFail(message));
	}
}

function* changeAllCompletedSaga(action: IAction) {
	try {
		const selectedOption: ResponseGenerator = yield select(getSelectedOption);
		const { active } = yield action.payload;
		const TODOS_URL = getURL(selectedOption);
		const userID: AuthResponse = yield select(getUserID);

		const requestOptions = {
			method: HTTP_METHODS.PATCH,
			body: JSON.stringify({ changeStatusAll: 'true', isAllCompleted: active, userID }),
		};
		const todos: ResponseGenerator = yield call(callAPI, TODOS_URL, requestOptions);
		yield put(setTodosSuccess(todos));
	} catch (error) {
		let message = 'Unknown Error';
		if (error instanceof Error) message = error.message;
		yield put(setTodosFail(message));
	}
}

/** Watcher */

function* todosWatcher() {
	yield takeEvery(GET_TODOS.REQUEST, getTodosSaga);

	yield takeEvery(UPDATE_TODO.REQUEST, updateTodoSaga);
	yield takeEvery(ADD_TODO.REQUEST, addTodoSaga);
	yield takeEvery(DELETE_TODO.REQUEST, deleteTodoSaga);
	yield takeEvery(CHANGE_TODO_STATUS.REQUEST, changeTodoStatusSaga);
	yield takeEvery(CHANGE_TODO_COMPLETED.REQUEST, changeAllCompletedSaga);
}

export default todosWatcher;
