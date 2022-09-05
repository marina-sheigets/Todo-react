import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { ChangeEvent, FC, FormEvent, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { addTodoRequest, changeAllCompletedRequest } from '../redux/action-creators/todoActions';
import { getIsAuth } from '../redux/selectors/authSelector';
import BeenhereIcon from '@mui/icons-material/Beenhere';
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

	const addTodo = (e: FormEvent) => {
		e.preventDefault();
		if (newTodoText.trim().length !== 0) {
			dispatch(addTodoRequest(newTodoText));
			setNewTodoText('');
		}
	};

	const isAllCompleted = useMemo(() => todos.every((elem: Todo) => elem.checked), [todos]);

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
					<Box className='todo-app'>
						<Typography variant='h3' className='main-h1'>
							ToDo List
						</Typography>
						<Box component='form' className='todo-form' onSubmit={addTodo}>
							<Button
								variant='contained'
								style={{ flex: 1 }}
								className={`activate ${isAllCompleted}`}
								type='button'
								onClick={changeAllCompleted}>
								<BeenhereIcon />
							</Button>
							<TextField
								size='small'
								style={{ flex: 12 }}
								type={'text'}
								value={newTodoText}
								onChange={handleInputChange}
								label='Enter todo task'
							/>
							<button
								data-testid='add-todo-button'
								type='submit'
								className='add-button'
								/* variant='contained' */
								style={{ flex: 1 }}>
								Add
							</button>
						</Box>

						<TodoList />
						<Filtering />
					</Box>
				</>
			)}
		</>
	);
};

export default TodoMain;
