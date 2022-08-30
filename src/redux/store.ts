import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { socket } from '../socket';
import { NOTIFICATION_RECEIVED } from './constants';
import rootReducer from './reducers/rootReducer';
import rootSaga from './saga/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

socket.on('client_notification', (data) => {
	console.log(data);
	store.dispatch({
		type: NOTIFICATION_RECEIVED,
		payload: data,
	});
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
