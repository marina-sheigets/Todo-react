import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/action-creators/authActions';
import { getUsername } from '../../redux/selectors/authSelector';
import './Header.css';

function Header() {
	const username = useSelector(getUsername);
	const dispatch = useDispatch();

	const logout = () => {
		dispatch(logoutUser());
	};
	return (
		<Box className='header'>
			<Box className='nav'>
				<Typography variant='h5'>Welcome, {username} </Typography>
				<Button color='inherit' style={{ backgroundColor: 'coral' }} onClick={logout}>
					Logout
				</Button>
			</Box>
		</Box>
	);
}

export default Header;
