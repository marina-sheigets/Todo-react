export interface Todo {
	id: number;
	text: string;
	checked: boolean;
}

export interface IRootReducerState {
	todosList: Todo[];
	selectedOption: string;
	isLoading: boolean;
	error: string | null;
}

export type IRootReducerAction<T> = {
	type: string;
	payload?: T;
};

export interface IAction {
	type: string;
	payload?: any;
}

export interface IBodyContent {
	title?: string;
	changeStatus?: string;
	changeStatusAll?: string;
	active?: boolean;
	id?: number;
}

// for yield
export interface ResponseGenerator {
	todosReducer?: any;
}
