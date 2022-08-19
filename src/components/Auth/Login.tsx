import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import {
	registerUserRequest,
	loginUserRequest,
	clearError,
	checkUserAuth,
} from '../../redux/action-creators/authActions';
import { useDispatch, useSelector } from 'react-redux';
import './Auth.css';
import { getError, getIsAuth } from '../../redux/selectors/authSelector';
import { Navigate, useNavigate } from 'react-router';

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const error = useSelector(getError);
	const isAuth = useSelector(getIsAuth);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmedPassword, setConfirmedPassword] = useState('');

	useEffect(() => {
		dispatch(clearError());
		if (localStorage.getItem('token')) {
			dispatch(checkUserAuth());
		}
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

	const isPasswordsEqual = useMemo(() => {
		if (confirmedPassword === password) {
			return true;
		}
		return false;
	}, [confirmedPassword, password]);

	const loginUser = useCallback(() => {
		dispatch(loginUserRequest({ email, password }));
	}, [email, password, dispatch]);

	const isAllEmty = useMemo(() => {
		if (password.trim().length === 0 || email.trim().length === 0) {
			return true;
		}
		return false;
	}, [password, email]);

	const toRegister = () => {
		navigate('/register');
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
						onClick={loginUser}>
						Login
					</button>
					<p onClick={toRegister}>
						Don`t have an account ?{' '}
						<button className='action' onClick={toRegister}>
							Sign up
						</button>
					</p>
					{error ? <p className='register-error'>{error}</p> : ''}
				</div>
			)}
		</>
	);
}

export default Login;
