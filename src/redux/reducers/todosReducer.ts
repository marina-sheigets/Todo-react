import { GET_TODOS, SET_TODOS, SET_SELECTED } from '../constants';
import { OPTIONS } from '../../constants';
import { IAction, IRootReducerState } from '../../types';

const initialState: IRootReducerState = {
	todosList: [],
	selectedOption: OPTIONS.all,
	isLoading: false,
	error: null,
};

const todosReducer = (state = initialState, action: IAction): IRootReducerState => {
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
