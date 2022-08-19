import { IUser } from '../../types/auth-types';
import { REGISTER_USER, SET_USER } from '../constants';

interface IAuthReducerState {
	user: IUser;
	isAuth: Boolean;
	error: string;
}
const initialState: any = {
	user: {},
	isAuth: false,
	error: '',
};

const authReducer = (state = initialState, action: any): IAuthReducerState => {
	switch (action.type) {
		case SET_USER.SUCCESS:
			return { ...state, isAuth: true, user: { ...action.payload.user } };
		case SET_USER.FAIL:
			return { ...state, error: action.payload.errorMessage };
		case 'LOGOUT_REQUEST':
			return { ...state, isAuth: false, user: {} };

		default:
			return state;
	}
};

export default authReducer;
