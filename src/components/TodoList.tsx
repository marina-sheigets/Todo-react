import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTodosRequest } from '../redux/action-creators';
import TodoItem from './TodoItem';
import Loader from './Loader/Loader';
import { getError, getIsLoading, getTodos } from '../redux/selectors';

const TodoList: FC = () => {
	const todos = useSelector(getTodos);
	const error = useSelector(getError);
	const isLoading = useSelector(getIsLoading);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setTodosRequest());
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
