import {
	Button,
	Checkbox,
	FormLabel,
	Grid,
	Box,
	ListItem,
	ListItemButton,
	ListItemText,
	TextField,
} from '@mui/material';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	changeTodoStatusRequest,
	deleteTodoRequest,
	updateTodoRequest,
} from '../redux/action-creators/todoActions';
import { IBodyContent, Todo } from '../types';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

interface TodoItemProps {
	todo: Todo;
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
	const [editingMode, setEditingMode] = useState(false);
	const [editText, setEditText] = useState('');

	let { id, text, checked } = todo;
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
				<Box className='edit'>
					<Button
						className='save'
						data-testid='submitEditing'
						variant='contained'
						onClick={handleEditTodo}>
						<CheckIcon />
					</Button>
					<TextField
						data-testid={`edit-input ${id}`}
						className='edit-field'
						size='small'
						value={editText}
						onChange={handleChangeEditText}
					/>
					<Button
						data-testid='cancel-edit'
						className='cancel'
						variant='contained'
						type='submit'
						onClick={handleCancelTodo}>
						<ClearIcon />
					</Button>
				</Box>
			) : (
				<ListItem
					style={{
						display: 'flex',
						width: '100%',
						padding: 0 /* , paddingRight: 'none' */,
					}}>
					<Checkbox
						data-testid='todo-checked'
						checked={checked}
						onChange={handleChangeStatus}
						style={{ flex: 1 }}
					/>
					<FormLabel
						data-testid='todo-text'
						style={{ flex: 12, paddingLeft: '2rem !important' }}
						htmlFor={id.toString()}
						className={checked.toString()}
						onDoubleClick={handleSetEdit}>
						{text}
					</FormLabel>
					<Button
						data-testid='todo-delete'
						size='medium'
						className='cancel'
						variant='contained'
						onClick={deleteTodo}
						style={{ flex: 1 }}>
						<DeleteIcon />
					</Button>
				</ListItem>
			)}
		</>
	);
};

export default TodoItem;
