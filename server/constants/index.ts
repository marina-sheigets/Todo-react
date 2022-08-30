export const PORT = 3030;

export const DB_NAME = 'TodoApp';
export const REFRESH_TOKEN = 'refreshToken';
export const URL_MONGO = `mongodb://localhost:27017/${DB_NAME}`;
export const ROLES = {
	user: 'USER',
	admin: 'ADMIN',
};
export const COLLECTION = 'todos';

export const NOTIFICATION = {
	ADD_TODO: 'ADD_TODO',
	DELETE_TODO: 'DELETE_TODO',
	ALL_COMPLETED_TODOS: 'ALL_COMPLETED_TODOS',
	UPDATE_TODO: 'UPDATE_TODO',
	GET_TODOS: 'GET_TODOS',
};

export const ADD_TODO_EVENT = 'ADD_TODO';
