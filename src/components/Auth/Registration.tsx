import { Button, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import { registerUserRequest, clearError } from '../../redux/action-creators/authActions';
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
				<Box className='login-form'>
					<TextField
						size='small'
						onChange={handleEmailChange}
						value={email}
						label='Email'
					/>
					<TextField
						size='small'
						onChange={handleUsernameChange}
						value={username}
						label='Username'
					/>
					<TextField
						size='small'
						type='password'
						className={isPasswordsEqual ? '' : 'error'}
						onChange={handleChangePassword}
						value={password}
						label='Password'
					/>
					<TextField
						size='small'
						type='password'
						className={isPasswordsEqual ? '' : 'error'}
						onChange={handleChangeConfirmedPassword}
						value={confirmedPassword}
						label='Confirm password'
					/>
					{isPasswordsEqual ? (
						''
					) : (
						<Typography className='register-error'>Passwords are not equal</Typography>
					)}
					<Button
						disabled={!isPasswordsEqual || isAllEmty ? true : false}
						style={{ backgroundColor: 'grey', color: 'white' }}
						onClick={register}>
						Register
					</Button>
					<Typography variant='body1' onClick={register}>
						Already have an account ?<Button onClick={toLogin}>Log in</Button>
					</Typography>
					{error ? <Typography className='register-error'>{error}</Typography> : ''}
				</Box>
			)}
		</>
	);
}

export default Registration;
