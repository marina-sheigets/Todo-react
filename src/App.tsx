import Auth from './components/Auth/Auth';
import TodoMain from './components/TodoMain';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAuth } from './redux/selectors/authSelector';
import { useEffect } from 'react';
import { checkUserAuth } from './redux/action-creators/authActions';

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(checkUserAuth());
	}, []);

	const isAuth = useSelector(getIsAuth);

	if (isAuth) {
		return <TodoMain />;
	}

	return <Auth />;
}

export default App;
