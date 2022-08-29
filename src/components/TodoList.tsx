import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodosRequest } from '../redux/action-creators/todoActions';
import TodoItem from './TodoItem';
import Loader from './Loader/Loader';
import { getError, getIsLoading, getTodos } from '../redux/selectors/todosSelector';
import { io } from 'socket.io-client';
import { getUserID } from '../redux/selectors/authSelector';

const TodoList: FC = () => {
	const todos = useSelector(getTodos);
	const error = useSelector(getError);
	const isLoading = useSelector(getIsLoading);
	const socket = useRef(io(`ws://localhost:3030`));
	const userID = useSelector(getUserID);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTodosRequest());
		console.log(userID);
		socket.current.emit('addUser', userID);
	}, [dispatch]);

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return <p>{error}</p>;
	}

	if (todos.length === 0) {
		return <p>No any todos...</p>;
	}

	return (
		<>
			<ul className='todo-list'>
				{todos.map((elem, index) => (
					<TodoItem key={index} todo={elem} />
				))}
			</ul>
		</>
	);
};

export default TodoList;
