import { takeEvery, select, put, call } from 'redux-saga/effects';
import {
	GET_TODOS,
	HTTP_METHODS,
	DELETE_TODO,
	ADD_TODO,
	UPDATE_TODO_REQUEST,
	CHANGE_TODO_COMPLETED,
	CHANGE_TODO_STATUS,
	PATH,
	FILTER_PARAM,
} from '../../constants';
import { setTodosFail, setTodosRequest, setTodosSuccess } from '../action-creators';
import { ResponseGenerator } from '../../types';
import { callAPI } from '../../api';

function* getTodosSaga(): any {
	try {
		const state = yield select();
		const { selectedOption } = state.todosReducer;
		const todos: ResponseGenerator = yield call(
			callAPI,
			PATH.todos,
			FILTER_PARAM + selectedOption
		);

		yield put(setTodosSuccess(todos));
	} catch (error) {
		let message = 'Unknown Error';
		if (error instanceof Error) message = error.message;
		yield put(setTodosFail(message));
	}
}

function* deleteTodoSaga(action: any) {
	try {
		yield put(setTodosRequest());
		const state: ResponseGenerator = yield select();
		const { selectedOption } = state.todosReducer;
		const id = action.payload;

		const requestOptions = {
			method: HTTP_METHODS.DELETE,
		};
		const todos: ResponseGenerator = yield call(
			callAPI,
			PATH.todos,
			FILTER_PARAM + selectedOption,
			requestOptions,
			id
		);
		yield put(setTodosSuccess(todos));
	} catch (error) {
		let message = 'Unknown Error';
		if (error instanceof Error) message = error.message;
		yield put(setTodosFail(message));
	}
}

function* addTodoSaga(action: any) {
	try {
		yield put(setTodosRequest());
		const state: ResponseGenerator = yield select();
		const { selectedOption } = state.todosReducer;
		const title = action.payload;
		const requestOptions = {
			method: HTTP_METHODS.POST,
			body: JSON.stringify({ title }),
		};
		const todos: ResponseGenerator = yield call(
			callAPI,
			PATH.todos,
			FILTER_PARAM + selectedOption,
			requestOptions
		);
		yield put(setTodosSuccess(todos));
	} catch (error) {
		let message = 'Unknown Error';
		if (error instanceof Error) message = error.message;
		yield put(setTodosFail(message));
	}
}

function* updateTodoSaga(action: any) {
	try {
		yield put(setTodosRequest());
		const state: ResponseGenerator = yield select();
		const { selectedOption } = state.todosReducer;
		const { id, title } = yield action.payload;
		const requestOptions = {
			method: HTTP_METHODS.PATCH,
			body: JSON.stringify({ title }),
		};
		const todos: ResponseGenerator = yield call(
			callAPI,
			PATH.todos,
			FILTER_PARAM + selectedOption,
			requestOptions,
			id
		);
		yield put(setTodosSuccess(todos));
	} catch (error) {
		let message = 'Unknown Error';
		if (error instanceof Error) message = error.message;
		yield put(setTodosFail(message));
	}
}

function* changeTodoStatusSaga(action: any) {
	try {
		yield put(setTodosRequest());
		const state: ResponseGenerator = yield select();
		const { selectedOption } = state.todosReducer;
		const { id } = yield action.payload;
		const requestOptions = {
			method: HTTP_METHODS.PATCH,
			body: JSON.stringify({ changeStatus: 'true' }),
		};
		const todos: ResponseGenerator = yield call(
			callAPI,
			PATH.todos,
			FILTER_PARAM + selectedOption,
			requestOptions,
			id
		);

		yield put(setTodosSuccess(todos));
	} catch (error) {
		let message = 'Unknown Error';
		if (error instanceof Error) message = error.message;
		yield put(setTodosFail(message));
	}
}

function* changeAllCompletedSaga(action: any) {
	try {
		yield put(setTodosRequest());
		const state: ResponseGenerator = yield select();
		const { selectedOption } = state.todosReducer;
		const { active } = yield action.payload;
		const requestOptions = {
			method: HTTP_METHODS.PATCH,
			body: JSON.stringify({ changeStatusAll: 'true', active }),
		};
		const todos: ResponseGenerator = yield call(
			callAPI,
			PATH.todos,
			FILTER_PARAM + selectedOption,
			requestOptions
		);
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

	yield takeEvery(UPDATE_TODO_REQUEST, updateTodoSaga);
	yield takeEvery(ADD_TODO, addTodoSaga);
	yield takeEvery(DELETE_TODO, deleteTodoSaga);
	yield takeEvery(CHANGE_TODO_STATUS, changeTodoStatusSaga);
	yield takeEvery(CHANGE_TODO_COMPLETED, changeAllCompletedSaga);
}

export default todosWatcher;
