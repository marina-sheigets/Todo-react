import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from './components/Auth/Registration';
import Login from './components/Auth/Login';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route path='/todos' element={<App />} />
				<Route path='/' element={<Login />} />
				<Route path='/register' element={<Registration />} />
			</Routes>
		</BrowserRouter>
	</Provider>
);
