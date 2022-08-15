import { takeEvery, select, put, call } from 'redux-saga/effects';
import {
	GET_TODOS,
	DELETE_TODO,
	ADD_TODO,
	UPDATE_TODO,
	CHANGE_TODO_COMPLETED,
	CHANGE_TODO_STATUS,
} from '../constants';
import { PATH, HTTP_METHODS, TODOS_URL } from '../../constants';
import { setTodosFail, getTodosRequest, setTodosSuccess } from '../action-creators';
import { ResponseGenerator } from '../../types';
import { callAPI } from '../../api';
import { getSelectedOption } from '../selectors';
import { getURL } from '../../utils';

function* getTodosSaga(): any {
	try {
		const selectedOption: ResponseGenerator = yield select(getSelectedOption);
		const URL = getURL(selectedOption);
		const todos: ResponseGenerator = yield call(callAPI, TODOS_URL + URL);

		yield put(setTodosSuccess(todos));
	} catch (error) {
		let message = 'Unknown Error';
		if (error instanceof Error) message = error.message;
		yield put(setTodosFail(message));
	}
}

function* deleteTodoSaga(action: any) {
	try {
		yield put(getTodosRequest());
		const selectedOption: ResponseGenerator = yield select(getSelectedOption);
		const id = action.payload;
		const URL = getURL(selectedOption, id);

		const requestOptions = {
			method: HTTP_METHODS.DELETE,
		};

		const todos: ResponseGenerator = yield call(callAPI, TODOS_URL + URL, requestOptions);
		yield put(setTodosSuccess(todos));
	} catch (error) {
		let message = 'Unknown Error';
		if (error instanceof Error) message = error.message;
		yield put(setTodosFail(message));
	}
}

function* addTodoSaga(action: any) {
	try {
		yield put(getTodosRequest());
		const selectedOption: ResponseGenerator = yield select(getSelectedOption);
		const title = action.payload;
		const URL = getURL(selectedOption);

		const requestOptions = {
			method: HTTP_METHODS.POST,
			body: JSON.stringify({ title }),
		};
		const todos: ResponseGenerator = yield call(callAPI, TODOS_URL + URL, requestOptions);
		yield put(setTodosSuccess(todos));
	} catch (error) {
		let message = 'Unknown Error';
		if (error instanceof Error) message = error.message;
		yield put(setTodosFail(message));
	}
}

function* updateTodoSaga(action: any) {
	try {
		yield put(getTodosRequest());
		const selectedOption: ResponseGenerator = yield select(getSelectedOption);
		const { id, title } = yield action.payload;

		const URL = getURL(selectedOption, id);

		const requestOptions = {
			method: HTTP_METHODS.PATCH,
			body: JSON.stringify({ title }),
		};
		const todos: ResponseGenerator = yield call(callAPI, TODOS_URL + URL, requestOptions);
		yield put(setTodosSuccess(todos));
	} catch (error) {
		let message = 'Unknown Error';
		if (error instanceof Error) message = error.message;
		yield put(setTodosFail(message));
	}
}

function* changeTodoStatusSaga(action: any) {
	try {
		yield put(getTodosRequest());
		const selectedOption: ResponseGenerator = yield select(getSelectedOption);
		const { id } = yield action.payload;
		const URL = getURL(selectedOption, id);

		const requestOptions = {
			method: HTTP_METHODS.PATCH,
			body: JSON.stringify({ changeStatus: 'true' }),
		};
		const todos: ResponseGenerator = yield call(callAPI, TODOS_URL + URL, requestOptions);

		yield put(setTodosSuccess(todos));
	} catch (error) {
		let message = 'Unknown Error';
		if (error instanceof Error) message = error.message;
		yield put(setTodosFail(message));
	}
}

function* changeAllCompletedSaga(action: any) {
	try {
		yield put(getTodosRequest());
		const selectedOption: ResponseGenerator = yield select(getSelectedOption);
		const { active } = yield action.payload;

		const URL = getURL(selectedOption);
		console.log(TODOS_URL + URL);

		const requestOptions = {
			method: HTTP_METHODS.PATCH,
			body: JSON.stringify({ changeStatusAll: 'true', active }),
		};
		const todos: ResponseGenerator = yield call(callAPI, TODOS_URL + URL, requestOptions);
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
