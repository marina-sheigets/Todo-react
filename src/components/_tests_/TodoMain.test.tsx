import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import store from '../../redux/store';
import * as reactRedux from 'react-redux';
import TodoMain from '../TodoMain';
import { BrowserRouter } from 'react-router-dom';
import { getTodos } from '../../redux/selectors/todosSelector';

jest.mock('../Header/Header', () => () => <div data-testid='header'>Header</div>);
jest.mock('../TodoList', () => () => <div data-testid='todoList'>TodoList</div>);
jest.mock('../Filtering', () => () => <div data-testid='filtering'>Filtering</div>);

const state = {
	todos: {
		todosList: [],
	},
	auth: {
		isAuth: true,
	},
};
const mockDispatch = jest.fn();
const mockSelector = jest.fn((selector) => selector(state));

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockDispatch,
	useSelector: () => mockSelector,
}));

/* jest.mock('../../redux/selectors/todosSelector', () => ({
	getTodos: jest.fn().mockReturnValue([]),
}));

jest.mock('../../redux/selectors/authSelector', () => ({
	getIsAuth: jest.fn().mockReturnValue(true),
}));
 */
describe('TodoMain component', () => {
	it('component exists', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<TodoMain />
				</BrowserRouter>
			</Provider>
		);
		/* mockSelector
			.mockReturnValueOnce([
				{
					id: 0,
					text: 'Buy food',
					checked: false,
				},
			])
			.mockReturnValueOnce(true); */

		// eslint-disable-next-line testing-library/no-debugging-utils
		/* 		screen.debug();
		 */ let buttonSelectAll = screen.getByTestId('selct-all');
		expect(buttonSelectAll).toBeInTheDocument();
		// eslint-disable-next-line testing-library/no-debugging-utils
		//screen.debug();
	});

	afterEach(() => {
		mockDispatch.mockClear();
		mockSelector.mockClear();
	});
});
