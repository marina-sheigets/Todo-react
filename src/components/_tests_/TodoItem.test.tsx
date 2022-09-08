import { fireEvent, render, screen } from '@testing-library/react';
import TodoItem from '../TodoItem';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../../utils';
import { Provider, useDispatch } from 'react-redux';
import store from '../../redux/store';
import * as reactRedux from 'react-redux';
import {
	changeTodoStatusRequest,
	deleteTodoRequest,
	updateTodoRequest,
} from '../../redux/action-creators/todoActions';

const todo = {
	id: 0,
	text: 'Buy food',
	checked: false,
};

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockDispatch,
}));

describe('TodoItem component', () => {
	afterAll(() => {
		mockDispatch.mockClear();
	});
	it('should render 1 todo item', () => {
		render(
			<Provider store={store}>
				<TodoItem todo={todo} />
			</Provider>
		);
		const checkbox: any = screen.getByTestId('todo-checked');
		expect(checkbox).toBeInTheDocument();
		expect(checkbox.checked).toBeFalsy();

		const todoText = screen.getByTestId('todo-text');
		expect(todoText.textContent).toBe('Buy food');
	});

	it('should dispatch deleteTodo action', () => {
		render(
			<Provider store={store}>
				<TodoItem todo={todo} />
			</Provider>
		);
		const deleteButton = screen.getByTestId('todo-delete');
		fireEvent.click(deleteButton);
		expect(mockDispatch).toHaveBeenCalledWith(deleteTodoRequest(todo.id));
	});

	it('should dispatch toggleTodo action', () => {
		render(
			<Provider store={store}>
				<TodoItem todo={todo} />
			</Provider>
		);
		const checkbox = screen.getByRole('checkbox');
		userEvent.click(checkbox);
		expect(mockDispatch).toHaveBeenCalledWith(changeTodoStatusRequest({ id: todo.id }));
	});

	it('should dispatch editTodo action', () => {
		render(
			<Provider store={store}>
				<TodoItem todo={todo} />
			</Provider>
		);
		const todoLabel = screen.getByTestId('todo-text');
		fireEvent.dblClick(todoLabel);

		const editInput = screen.getByTestId('edit-input 0').firstChild?.firstChild;
		expect(editInput).toBeInTheDocument();
		fireEvent.change(editInput, {
			target: {
				value: 'Buy coffee',
			},
		});

		fireEvent.click(screen.getByTestId('submitEditing'));
		expect(mockDispatch).toHaveBeenCalledWith(
			updateTodoRequest({ id: todo.id, title: 'Buy coffee' })
		);
	});

	it('should set initial value after submiting editing null value', () => {
		render(
			<Provider store={store}>
				<TodoItem todo={todo} />
			</Provider>
		);
		const todoLabel = screen.getByTestId('todo-text');
		fireEvent.dblClick(todoLabel);

		const editInput = screen.getByTestId('edit-input 0').firstChild?.firstChild;
		expect(editInput).toBeInTheDocument();
		fireEvent.change(editInput, {
			target: {
				value: '',
			},
		});

		fireEvent.click(screen.getByTestId('submitEditing'));
		expect(todoLabel.textContent).toBe(todo.text);
	});

	it('after cancel editing, should set initial value', () => {
		render(
			<Provider store={store}>
				<TodoItem todo={todo} />
			</Provider>
		);
		const todoLabel = screen.getByTestId('todo-text');
		fireEvent.dblClick(todoLabel);

		const editInput = screen.getByTestId('edit-input 0').firstChild?.firstChild;
		expect(editInput).toBeInTheDocument();
		fireEvent.change(editInput, {
			target: {
				value: 'something',
			},
		});

		fireEvent.click(screen.getByTestId('cancel-edit'));
		expect(todoLabel.textContent).toBe(todo.text);
	});
});
