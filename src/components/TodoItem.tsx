import { ChangeEvent, FC, useState } from 'react';
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
	const [editId, setEditId] = useState(0);
	const [editText, setEditText] = useState('');

	const { id, text, checked } = todo;
	const dispatch = useDispatch();

	const deleteTodo = () => /*  useCallback(() => */ {
		dispatch(deleteTodoRequest(todo.id));
	}; /* , []); */

	const handleChangeEditText = (e: ChangeEvent<HTMLInputElement>) => {
		setEditText(e.target.value);
	};
	const handleEditTodo = () => {
		if (editText.trim().length !== 0) {
			updateTodo({
				id: editId,
				title: editText,
			});
		}
		setEditingMode(false);
	};

	const handleCancelTodo = () => {
		updateTodo({ id: editId, title: text });
		setEditingMode(false);
		setEditText(text);
	};

	const updateTodo = (bodyContent: IBodyContent) => {
		dispatch(updateTodoRequest(bodyContent));
	};

	const handleChangeStatus = () => {
		dispatch(changeTodoStatusRequest({ id }));
	};

	const handleSetEdit = () => {
		console.log('work');
		setEditingMode(true);
		setEditId(id);
		setEditText(text);
	};

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
