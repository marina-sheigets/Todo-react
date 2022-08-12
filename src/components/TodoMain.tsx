import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoRequest, changeAllCompletedRequest } from '../redux/action-creators';
import { RootState } from '../redux/store';
import { Todo } from '../types';
import Filtering from './Filtering';
import TodoList from './TodoList';

const TodoMain: FC = () => {
	const [newTodoText, setNewTodoText] = useState('');

	const todos = useSelector((state: RootState) => state.rootReducer.todos);
	const dispatch = useDispatch();

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTodoText(e.target.value);
	};

	const addTodo = (e: FormEvent) => {
		e.preventDefault();

		if (newTodoText.trim().length !== 0) {
			dispatch(addTodoRequest(newTodoText));
			setNewTodoText('');
		}
	};

	const isAllCompleted = (): boolean => {
		return todos.every((elem: Todo) => elem.checked);
	};

	const changeAllCompleted = () => {
		const isActive = isAllCompleted();
		dispatch(changeAllCompletedRequest({ active: isActive }));
	};

	return (
		<>
			<h1 className='main-h1'>ToDo List</h1>
			<form className='todo-form' onSubmit={addTodo}>
				<button
					type='button'
					className={`activate ${isAllCompleted()}`}
					onClick={changeAllCompleted}>
					☑
				</button>
				<input
					type='text'
					value={newTodoText}
					onChange={handleInputChange}
					className='todo-input'
					placeholder='Enter todo task'
				/>
				<input type='submit' className='submit' value='Add' />
			</form>

			<TodoList />
			<Filtering />
		</>
	);
};

export default TodoMain;
