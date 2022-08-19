import { RootState } from '../store';

export const getIsAuth = (state: RootState) => state.auth.isAuth;
export const getUsername = (state: RootState) => state.auth.user.username;
export const getUserID = (state: RootState) => state.auth.user.id;
export const getError = (state: RootState) => state.auth.error;
