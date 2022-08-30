export const PORT = 3030;

export const DB_NAME = 'TodoApp';
export const REFRESH_TOKEN = 'refreshToken';
export const URL_MONGO = `mongodb://localhost:27017/${DB_NAME}`;
export const ROLES = {
	user: 'USER',
	admin: 'ADMIN',
};
export const COLLECTION = 'todos';

export const GET_TODOS_EVENT = 'GET_TODOS';
export const ADD_TODO_EVENT = 'ADD_TODO';
