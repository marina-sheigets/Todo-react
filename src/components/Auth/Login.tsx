import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import {
	loginUserRequest,
	clearError,
	checkUserAuth,
} from '../../redux/action-creators/authActions';
import { useDispatch, useSelector } from 'react-redux';
import './Auth.css';
import { getError, getIsAuth } from '../../redux/selectors/authSelector';
import { Navigate, useNavigate } from 'react-router';
import { Box } from '@mui/system';
import { Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const error = useSelector(getError);
	const isAuth = useSelector(getIsAuth);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

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
				<Box data-testid='login-div' className='login-form'>
					<TextField
						size='small'
						onChange={handleEmailChange}
						value={email}
						label='Email'
					/>
					<TextField
						size='small'
						type='password'
						onChange={handleChangePassword}
						value={password}
						label='Password'
					/>
					<Button
						style={{ backgroundColor: 'grey', color: 'white' }}
						disabled={isAllEmty ? true : false}
						data-testid='login-button'
						onClick={loginUser}>
						Login
					</Button>
					<Typography>
						Don`t have an account ?{' '}
						<Button
							onClick={toRegister}
							data-testid='redirect-to-sign'
							className='action'>
							Sign up
						</Button>
					</Typography>
					{error ? <Typography className='register-error'>{error}</Typography> : ''}
				</Box>
			)}
		</>
	);
}

export default Login;
