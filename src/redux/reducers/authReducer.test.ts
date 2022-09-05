import { logoutUser, setUser } from '../action-creators/authActions';
import authReducer from './authReducer';

const initialState: any = {
	user: {},
	isAuth: false,
	error: '',
};

describe('authReducer', () => {
	it('new user should be set', () => {
		let expectedNewUser = { user: { id: 1, username: 'Marina', email: 'marina@gmail.com' } };
		let action = setUser(expectedNewUser);
		let newState = authReducer(initialState, action);
		expect(newState.isAuth).toBe(true);
		expect(JSON.stringify(newState.user)).toEqual(JSON.stringify(expectedNewUser.user));
	});

	it('it should log out', () => {
		let action = logoutUser();
		let newState = authReducer(initialState, action);
		expect(newState.isAuth).toBe(false);
		expect(JSON.stringify(newState.user)).toBe('{}');
	});
});
