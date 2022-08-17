export interface AuthResponse {
	accessToken: string;
	refreshToken: string;
	user: IUser;
	status?: number;
	errors?: [];
}

export interface IUser {
	email: string;
	username: string;
	id: number;
}
