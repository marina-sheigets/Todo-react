import {
	ChangeEvent,
	FC,
	FormEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { Dispatch } from 'redux';
import { io } from 'socket.io-client';
import { addTodoRequest, changeAllCompletedRequest } from '../redux/action-creators/todoActions';
import { SET_TODOS } from '../redux/constants';
import { getIsAuth, getUserID } from '../redux/selectors/authSelector';
import { getSelectedOption, getTodos } from '../redux/selectors/todosSelector';
/* import { socket } from '../socket';
 */ import { Todo } from '../types';
import Filtering from './Filtering';
import Header from './Header/Header';
import TodoList from './TodoList';

/* export const socket = io('ws://localhost:3030', {
	transports: ['websocket'],
	withCredentials: true,
}); */

const TodoMain: FC = () => {
	const [newTodoText, setNewTodoText] = useState('');
	const userID = useSelector(getUserID);
	const todos = useSelector(getTodos);
	const isAuth = useSelector(getIsAuth);
	const selectedOption = useSelector(getSelectedOption);

	const dispatch = useDispatch();

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTodoText(e.target.value);
	};

	/* function subscribeNewTodos() {
		return function (dispatch: Dispatch) {
			socket.on('addTodoSuccess', (newTodos) => {
				console.log(newTodos);
				dispatch({
					type: SET_TODOS.SUCCESS,
					payload: newTodos,
				});
			});
		};
	}
 */
	const addTodo =
		/* useCallback( */
		(e: FormEvent) => {
			e.preventDefault();

			if (newTodoText.trim().length! == 0) {
				//	socket.emit('addTodo', { newTodoText, selectedOption, userID });
				/* socket.on('addTodoSuccess', (todos) => {
					return (dispatch: any) => dispatch({ type: SET_TODOS.SUCCESS, payload: todos });
				});
 */ console.log('add Tood');

				//subscribeNewTodos()(dispatch);
				//dispatch(addTodoRequest(newTodoText));

				setNewTodoText('');
			}
		}; /* ,
		[newTodoText]
	); */

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
