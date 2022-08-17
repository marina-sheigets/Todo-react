import { GET_TODOS, SET_TODOS, SET_SELECTED } from '../constants';
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
		case SET_SELECTED.SUCCESS:
			return { ...state, selectedOption: action.payload };
		default:
			return state;
	}
};

export default todosReducer;
