import {
	GET_TODOS,
	SET_TODOS,
	SET_SELECTED,
	SET_NEW_TODO,
	DELETE_TODO,
	CHANGE_TODOS_COMPLETED,
	UPDATE_TODO,
} from '../constants';
import { OPTIONS } from '../../constants';
import { IAction, ITodosReducerState } from '../../types';

const initialState: ITodosReducerState = {
	todosList: [],
	selectedOption: OPTIONS.all,
	isLoading: false,
	error: null,
};

const todosReducer = (state = initialState, action: IAction): ITodosReducerState => {
	switch (action.type) {
		case GET_TODOS.REQUEST:
			return { ...state, isLoading: true };
		case SET_TODOS.SUCCESS:
			return { ...state, todosList: [...action.payload], isLoading: false };
		case SET_TODOS.FAIL:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		case SET_NEW_TODO.SUCCESS:
			return {
				...state,
				todosList: [action.payload, ...state.todosList],
			};
		case DELETE_TODO.SUCCESS:
			console.log(action.payload);
			return {
				...state,
				todosList: state.todosList.filter((elem) => elem.id != action.payload),
			};
		case UPDATE_TODO.SUCCESS:
			const updatedItem = action.payload;

			return {
				...state,
				todosList: state.todosList.map((elem) => {
					if (elem.id == updatedItem.id) {
						return updatedItem;
					}
					return elem;
				}),
			};
		case CHANGE_TODOS_COMPLETED.SUCCESS:
			console.log(action.payload);
			return { ...state, todosList: [...action.payload], isLoading: false };
		case SET_SELECTED.SUCCESS:
			return { ...state, selectedOption: action.payload };
		default:
			return state;
	}
};

export default todosReducer;
