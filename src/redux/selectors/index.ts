import { RootState } from './../store';

export const getTodos = (state: RootState) => state.todos.todosList;
export const getError = (state: RootState) => state.todos.error;
export const getIsLoading = (state: RootState) => state.todos.isLoading;
export const getSelectedOption = (state: RootState) => state.todos.selectedOption;
