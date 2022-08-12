import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTodosRequest } from '../redux/action-creators';
import { RootState } from '../redux/store';
import TodoItem from './TodoItem';
import Loader from './Loader/Loader';

const TodoList: FC = () => {
	const todos = useSelector((state: RootState) => state.rootReducer.todos);
	const error = useSelector((state: RootState) => state.rootReducer.error);
	const isLoading = useSelector((state: RootState) => state.rootReducer.isLoading);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setTodosRequest());
	}, [dispatch]);

	if (isLoading) {
		return <Loader />;
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
			{!!error && <p>{error}</p>}
		</>
	);
};

export default TodoList;
