import { ChangeEvent, FC, FormEvent, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { addTodoRequest, changeAllCompletedRequest } from '../redux/action-creators/todoActions';
import { getIsAuth } from '../redux/selectors/authSelector';
import { getTodos } from '../redux/selectors/todosSelector';
import { Todo } from '../types';
import Filtering from './Filtering';
import Header from './Header/Header';
import TodoList from './TodoList';

const TodoMain: FC = () => {
	const [newTodoText, setNewTodoText] = useState('');

	const todos = useSelector(getTodos);
	const isAuth = useSelector(getIsAuth);

	const dispatch = useDispatch();

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTodoText(e.target.value);
	};

	const addTodo = useCallback(
		(e: FormEvent) => {
			e.preventDefault();

			if (newTodoText.trim().length !== 0) {
				dispatch(addTodoRequest(newTodoText));
				setNewTodoText('');
			}
		},
		[newTodoText, dispatch]
	);

	const isAllCompleted = useMemo(() => todos.every((elem: Todo) => elem.Todo_checked), [todos]);

	const changeAllCompleted = useCallback(() => {
		dispatch(changeAllCompletedRequest({ active: isAllCompleted }));
	}, [dispatch, isAllCompleted]);

	return (
		<>
			{!isAuth ? (
				<Navigate to='/' replace={true} />
			) : (
				<>
					<Header />
					<div className='todo-app'>
						<h1 className='main-h1'>ToDo List</h1>
						<form className='todo-form' onSubmit={addTodo}>
							<button
								type='button'
								className={`activate ${isAllCompleted}`}
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
					</div>
				</>
			)}
		</>
	);
};

export default TodoMain;
