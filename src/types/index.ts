export interface Todo {
	Todo_id: number;
	Todo_text: string;
	Todo_checked: boolean;
}

export interface ITodosReducerState {
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

//callApi
export interface IOptions {
	method?: string;
	headers?: {
		Authorization: string;
		'Content-Type': string;
	};
	body?: IBodyContent;
}
