import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import { registerUserRequest, clearError } from '../../redux/action-creators/authActions';
import { CLEAR_ERROR } from '../../redux/constants';
import { getIsAuth, getError } from '../../redux/selectors/authSelector';
import './Auth.css';

function Registration() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const error = useSelector(getError);
	const isAuth = useSelector(getIsAuth);

	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmedPassword, setConfirmedPassword] = useState('');

	useEffect(() => {
		dispatch(clearError());
	}, []);

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleChangeConfirmedPassword = (e: ChangeEvent<HTMLInputElement>) => {
		setConfirmedPassword(e.target.value);
	};
	const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
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

	const isAllEmty = useMemo(() => {
		if (password.trim().length === 0 || email.trim().length === 0) {
			return true;
		}
		return false;
	}, [password, email]);

	const toLogin = () => {
		navigate('/');
	};

	return (
		<>
			{isAuth ? (
				<Navigate to='/todos' replace={true} />
			) : (
				<div className='login-form'>
					<input
						type='email'
						onChange={handleEmailChange}
						value={email}
						placeholder='Email'
					/>
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
					{isPasswordsEqual ? (
						''
					) : (
						<p className='register-error'>Passwords are not equal</p>
					)}
					<button
						disabled={!isPasswordsEqual || isAllEmty ? true : false}
						onClick={register}>
						Register
					</button>
					<p onClick={register}>
						Already have an account ?{' '}
						<button className='action' onClick={toLogin}>
							Log in
						</button>
					</p>
					{error ? <p className='register-error'>{error}</p> : ''}
				</div>
			)}
		</>
	);
}

export default Registration;
