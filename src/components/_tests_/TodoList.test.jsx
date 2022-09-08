import { Provider, useDispatch, useSelector } from 'react-redux';
import TodoList from '../TodoList';
import { render, screen } from '@testing-library/react';
import store from '../../redux/store';
import TodoItem from '../TodoItem';
import { OPTIONS } from '../../constants';
import * as reduxHooks from 'react-redux';
import { getTodosRequest, setTodosSuccess } from '../../redux/action-creators/todoActions';
import saga from 'redux-saga';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import { GET_TODOS, SET_TODOS } from '../../redux/constants';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../redux/reducers/rootReducer';
import todosReducer from '../../redux/reducers/todosReducer';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../TodoItem', () => ({
	TodoItem: jest.fn(() => <div>TodoItem</div>),
}));
//jest.mock('../TodoItem', () => ()=><div>TodoItem</div>

jest.mock('react-redux');

describe('TodoList Component', () => {
	it('todoList page should exist', () => {
		render(
			<Provider store={store}>
				<TodoList />
			</Provider>
		);
		const dispatch = jest.fn();
		//const useDispatchMocked = jest.spyOn(reduxHooks, 'useDispatch');
		useDispatch.mockReturnValue(dispatch);
		screen.debug();
		//	expect(screen.getByTestId('todolist')).toBeInTheDocument();
		/* fetchMock.getOnce(`todos/2213421?filter=All`, {
			headers: { 'content-type': 'application/json' },
			body: { todos: [{ id: 1, text: 'buy bread', checked: true }] },
		}); */
		/* let store = mockStore({
			reducer: rootReducer,
		}); */
		//store.dispatch(setTodosSuccess([{ id: 1, text: 'buy bread', checked: true }]));

		//expect(store.getActions()).toEqual(expectedActions);

		//*  store={store} */
		// eslint-disable-next-line testing-library/no-debugging-utils
		//	expect(screen.getByTestId('todolist')).toBeInTheDocument();
		// eslint-disable-next-line testing-library/no-debugging-utils
		//screen.debug();
	});
});
