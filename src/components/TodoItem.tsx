import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	changeTodoStatusRequest,
	deleteTodoRequest,
	updateTodoRequest,
} from '../redux/action-creators/todoActions';
import { IBodyContent, Todo } from '../types';

interface TodoItemProps {
	todo: Todo;
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
	const [editingMode, setEditingMode] = useState(false);
	const [editText, setEditText] = useState('');

	let { Todo_id: id, Todo_text: text, Todo_checked: checked } = todo;
	checked = !!checked;
	const dispatch = useDispatch();

	const deleteTodo = useCallback(() => {
		dispatch(deleteTodoRequest(id));
	}, [dispatch, id]);

	const handleChangeEditText = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setEditText(e.target.value);
		},
		[setEditText]
	);

	const handleSetEdit = useCallback(() => {
		setEditingMode(true);
		setEditText(text);
	}, [setEditingMode, setEditText, text]);

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
