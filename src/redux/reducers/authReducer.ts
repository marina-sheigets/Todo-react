import { IUser } from '../../types/auth-types';

interface IAuthReducerState {
	user: IUser;
	isAuth: Boolean;
}
const initialState: any = {
	user: {},
	isAuth: false,
	status: null,
};

const authReducer = (state = initialState, action: any): IAuthReducerState => {
	switch (action.type) {
		case 'SET_USER':
			return { ...state, isAuth: true, user: { ...action.payload.user } };
		case 'LOGOUT_REQUEST':
			return { ...state, isAuth: false, user: {} };
		default:
			return state;
	}
};

export default authReducer;
