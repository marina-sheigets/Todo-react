import { OPTIONS } from '../../constants';
import {
	changeAllCompletedSuccess,
	deleteTodoSuccess,
	setNewTodo,
	setTodosSuccess,
	setUpdatedTodoSuccess,
} from '../action-creators/todoActions';
import todosReducer from './todosReducer';

let initialState = {
	todosList: [{ id: 1, text: 'text', checked: true }],
	selectedOption: OPTIONS.all,
	isLoading: false,
	error: null,
};

describe('todosReducer', () => {
	it('new todos should be inserted', () => {
		let expectedTodolist = [{ id: 1, text: 'text', checked: true }];
		let action = setTodosSuccess(expectedTodolist);
		let newState = todosReducer(initialState, action);

		expect(JSON.stringify(newState.todosList)).toBe(JSON.stringify(expectedTodolist));
	});

	it('new todo item should be inserted', () => {
		let newTodoItem = { id: 2, text: 'text', checked: true };
		let action = setNewTodo(newTodoItem);
		let newState = todosReducer(initialState, action);

		expect(newState.todosList.some((todo) => todo.id === 2)).toBe(true);
		expect(newState.todosList.length).toBe(2);
	});

	it('it should delete item from todoList', () => {
		let expectDeletedTodoItem = { id: 1, text: 'text', checked: true };
		let actionDelete = deleteTodoSuccess(expectDeletedTodoItem.id);
		let newState = todosReducer(initialState, actionDelete);

		expect(newState.todosList.every((elem) => elem.id !== expectDeletedTodoItem.id)).toBe(true);
		expect(newState.todosList.length).toBe(0);
	});

	it('it should update item in TodoList', () => {
		let expectedUpdateItem = { id: 1, text: 'new text', checked: true };
		let action = setUpdatedTodoSuccess(expectedUpdateItem);
		let newState = todosReducer(initialState, action);

		expect(JSON.stringify(newState.todosList[0])).toBe(JSON.stringify(expectedUpdateItem));
	});

	it('it should set all todos the same checked field', () => {
		let expectedTodoList = [{ id: 1, text: 'new text 1', checked: true }];
		let action = changeAllCompletedSuccess(expectedTodoList);
		let newState = todosReducer(initialState, action);

		expect(JSON.stringify(newState.todosList)).toBe(JSON.stringify(expectedTodoList));
		expect(newState.todosList.length).toEqual(expectedTodoList.length);
	});
});
