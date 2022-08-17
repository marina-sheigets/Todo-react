import React from 'react';
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
		<div className='header'>
			<nav>
				<h2>Welcome, {username} </h2>
				<button onClick={logout}>Logout</button>
			</nav>
		</div>
	);
}

export default Header;
