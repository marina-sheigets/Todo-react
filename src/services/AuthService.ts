import { callAPI } from '../api';
import { HTTP_METHODS, AUTH_URL } from '../constants';
import { AuthResponse } from '../types/auth-types';

export default class AuthService {
	/*
	static async login(email: string, username: string, password: string): Promise<AuthResponse> {
		const requestOptions = {
			method: HTTP_METHODS.POST,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, username, password }),
		};
		return callAPI(USER_URL + '/login', requestOptions);
	}

	static async registration(email: string, password: string): Promise<AuthResponse> {
		const requestOptions = {
			method: HTTP_METHODS.POST,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		};
		return callAPI(USER_URL + '/registration', requestOptions);
	}
 */
	/* static async logout(): Promise<void> {
		return callAPI(AUTH_URL + '/logout');
	} */
}
