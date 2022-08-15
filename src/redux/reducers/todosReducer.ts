import { GET_TODOS, SET_SELECTED } from '../../constants';
import { OPTIONS } from '../../constants';
import { IAction, IRootReducerState } from '../../types';

const initialState: IRootReducerState = {
	todos: [],
	selectedOption: OPTIONS.all,
	isLoading: false,
	error: null,
};

const todosReducer = (state = initialState, action: IAction): IRootReducerState => {
	switch (action.type) {
		case GET_TODOS.REQUEST:
			return { ...state, isLoading: true };
		case GET_TODOS.SUCCESS:
			return { ...state, todos: [...action.payload], isLoading: false };
		case GET_TODOS.FAIL:
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
