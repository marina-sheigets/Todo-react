import { RootState } from './../store';

export const getTodos = (state: RootState) => state.todosReducer.todos;
export const getError = (state: RootState) => state.todosReducer.error;
export const getIsLoading = (state: RootState) => state.todosReducer.isLoading;
