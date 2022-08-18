import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { registerUserRequest, loginUserRequest } from '../../redux/action-creators/authActions';
import { useDispatch } from 'react-redux';
import './Auth.css';

function Auth() {
	const dispatch = useDispatch();

	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmedPassword, setConfirmedPassword] = useState('');

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleChangeConfirmedPassword = (e: ChangeEvent<HTMLInputElement>) => {
		setConfirmedPassword(e.target.value);
	};

	const isPasswordsEqual = useMemo(() => {
		if (confirmedPassword === password) {
			return true;
		}
		return false;
	}, [confirmedPassword, password]);

	const register = useCallback(() => {
		dispatch(registerUserRequest({ email, username, password }));
	}, [dispatch, email, username, password]);

	const loginUser = () => {
		dispatch(loginUserRequest({ email, password }));
	};

	const isAllEmty = useMemo(() => {
		if (
			password.trim().length === 0 ||
			email.trim().length === 0 ||
			username.trim().length === 0
		) {
			return true;
		}
		return false;
	}, [password, email, username]);

	return (
		<div className='login-form'>
			<input type='email' onChange={handleEmailChange} value={email} placeholder='Email' />
			<input
				type='text'
				onChange={handleUsernameChange}
				value={username}
				placeholder='Username'
			/>
			<input
				type='password'
				className={isPasswordsEqual ? '' : 'error'}
				onChange={handleChangePassword}
				value={password}
				placeholder='Password'
			/>
			<input
				type='password'
				className={isPasswordsEqual ? '' : 'error'}
				onChange={handleChangeConfirmedPassword}
				value={confirmedPassword}
				placeholder='Confirm password'
			/>
			{isPasswordsEqual ? '' : <p>Passwords are not equal</p>}
			<button disabled={!isPasswordsEqual || isAllEmty ? true : false} onClick={register}>
				Register
			</button>
			<button disabled={!isPasswordsEqual || isAllEmty ? true : false} onClick={loginUser}>
				Login
			</button>
		</div>
	);
}

export default Auth;
