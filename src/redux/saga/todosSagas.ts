import { takeEvery, select, put, call } from 'redux-saga/effects';
import {
	GET_TODOS,
	DELETE_TODO,
	ADD_TODO,
	UPDATE_TODO,
	CHANGE_TODOS_COMPLETED,
	CHANGE_TODO_STATUS,
	NOTIFICATION,
	NOTIFICATION_RECEIVED,
} from '../constants';
import { HTTP_METHODS } from '../../constants';
import {
	deleteTodoSuccess,
	setNewTodo,
	setTodosFail,
	setTodosSuccess,
	setUpdatedTodoSuccess,
	changeAllCompletedSuccess,
} from '../action-creators/todoActions';
import { IAction, ResponseGenerator } from '../../types';
import { callAPI } from '../../api';
import { getSelectedOption } from '../selectors/todosSelector';
import { getURL } from '../../utils';
import { getUserID } from '../selectors/authSelector';
import { socket } from '../../socket';

function* getTodosSaga() {
	try {
		const selectedOption: ResponseGenerator = yield select(getSelectedOption);
		const TODOS_URL = getURL(selectedOption);
		const userID: ResponseGenerator = yield select(getUserID);
		const requestOptions = {
			method: HTTP_METHODS.GET,
		};
		socket.emit('join', userID);
		yield call(callAPI, TODOS_URL, requestOptions);
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

		const requestOptions = {
			method: HTTP_METHODS.DELETE,
		};

		yield call(callAPI, TODOS_URL, requestOptions);
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
		const requestOptions = {
			method: HTTP_METHODS.POST,
			body: JSON.stringify({ title }),
		};

		yield call(callAPI, TODOS_URL, requestOptions);
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

		const requestOptions = {
			method: HTTP_METHODS.PATCH,
			body: JSON.stringify({ title }),
		};
		yield call(callAPI, TODOS_URL, requestOptions);
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

		const requestOptions = {
			method: HTTP_METHODS.PATCH,
			body: JSON.stringify({ changeStatus: 'true' }),
		};
		yield call(callAPI, TODOS_URL, requestOptions);
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

		const requestOptions = {
			method: HTTP_METHODS.PATCH,
			body: JSON.stringify({ changeStatusAll: 'true', isAllCompleted: active }),
		};
		yield call(callAPI, TODOS_URL, requestOptions);
	} catch (error) {
		let message = 'Unknown Error';
		if (error instanceof Error) message = error.message;
		yield put(setTodosFail(message));
	}
}

function* notificationSaga(action: IAction) {
	const { payload } = action;
	switch (payload.type) {
		case NOTIFICATION.ADD_TODO:
			yield put(setNewTodo(payload.data));
			break;
		case NOTIFICATION.DELETE_TODO:
			yield put(deleteTodoSuccess(payload.data));
			break;
		case NOTIFICATION.ALL_COMPLETED_TODOS:
			yield put(changeAllCompletedSuccess(payload.data));
			break;
		case NOTIFICATION.UPDATE_TODO:
			yield put(setUpdatedTodoSuccess(payload.data));
			break;
		case NOTIFICATION.GET_TODOS:
			yield put(setTodosSuccess(payload.data));
	}
}
/** Watcher */

function* todosWatcher() {
	yield takeEvery(GET_TODOS.REQUEST, getTodosSaga);
	yield takeEvery(UPDATE_TODO.REQUEST, updateTodoSaga);
	yield takeEvery(ADD_TODO.REQUEST, addTodoSaga);
	yield takeEvery(DELETE_TODO.REQUEST, deleteTodoSaga);
	yield takeEvery(CHANGE_TODO_STATUS.REQUEST, changeTodoStatusSaga);
	yield takeEvery(CHANGE_TODOS_COMPLETED.REQUEST, changeAllCompletedSaga);
	yield takeEvery(NOTIFICATION_RECEIVED, notificationSaga);
}

export default todosWatcher;
