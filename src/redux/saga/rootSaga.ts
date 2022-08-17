import { all } from 'redux-saga/effects';
import authWatcher from './authSaga';
import todosWatcher from './todosSagas';

const sagasArray = [todosWatcher(), authWatcher()];

function* rootSaga() {
	yield all(sagasArray);
}

export default rootSaga;
