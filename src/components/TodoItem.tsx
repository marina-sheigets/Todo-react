import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	changeTodoStatusRequest,
	deleteTodoRequest,
	updateTodoRequest,
} from '../redux/action-creators';
import { IBodyContent, Todo } from '../types';

interface TodoItemProps {
	todo: Todo;
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
	const [editingMode, setEditingMode] = useState(false);
	const [editText, setEditText] = useState('');

	const { id, text, checked } = todo;
	const dispatch = useDispatch();

	const deleteTodo = useCallback(() => {
		dispatch(deleteTodoRequest(id));
	}, [dispatch, id]);

	const handleChangeEditText = (e: ChangeEvent<HTMLInputElement>) => {
		setEditText(e.target.value);
	};

	const handleSetEdit = () => {
		setEditingMode(true);
		setEditText(text);
	};

	const updateTodo = useCallback(
		(bodyContent: IBodyContent) => {
			dispatch(updateTodoRequest(bodyContent));
		},
		[dispatch]
	);

	const handleEditTodo = useCallback(() => {
		if (editText.trim().length !== 0) {
			updateTodo({
				id: id,
				title: editText,
			});
		}
		setEditingMode(false);
	}, [id, editText, updateTodo]);

	const handleCancelTodo = useCallback(() => {
		updateTodo({ id: id, title: text });
		setEditingMode(false);
		setEditText(text);
	}, [id, text, updateTodo]);

	const handleChangeStatus = useCallback(() => {
		dispatch(changeTodoStatusRequest({ id }));
	}, [id, dispatch]);

	return (
		<>
			{editingMode ? (
				<span className='edit'>
					<button type='button' className='save' onClick={handleEditTodo}>
						☑
					</button>
					<input value={editText} onChange={handleChangeEditText} />
					<button className='cancel' type='submit' onClick={handleCancelTodo}>
						Cancel
					</button>
				</span>
			) : (
				<li>
					<input type='checkbox' checked={checked} onChange={handleChangeStatus} />
					<label
						htmlFor={id.toString()}
						className={checked.toString()}
						onDoubleClick={handleSetEdit}>
						{text}
					</label>
					<button type='button' onClick={deleteTodo}>
						{' '}
						×
					</button>
				</li>
			)}
		</>
	);
};

export default TodoItem;
