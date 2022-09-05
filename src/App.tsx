import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import TodoMain from './components/TodoMain';
import store from './redux/store';

function App() {
	return (
		<Routes>
			<Route path='/todos' element={<TodoMain />} />
			<Route path='/' element={<Login />} />
			<Route path='/register' element={<Registration />} />
		</Routes>
	);
}

export default App;
