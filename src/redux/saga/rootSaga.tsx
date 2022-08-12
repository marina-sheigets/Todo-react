import { all } from 'redux-saga/effects';
import todosWatcher from './todosSagas';

const sagasArray = [todosWatcher()];

function* rootSaga() {
	yield all(sagasArray);
}

export default rootSaga;
