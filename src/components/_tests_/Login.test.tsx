import { fireEvent, render, screen } from '@testing-library/react';
/* import store from '../../redux/store';
 */ import '@testing-library/jest-dom';
/* import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Auth/Login';
 */ import * as router from 'react-router';
import { renderWithRouter } from '../../utils';
import '@testing-library/jest-dom';
import Login from '../Auth/Login';
import { Provider } from 'react-redux';
import store from '../../redux/store';

describe('Login component', () => {
	let mockedNavigator: any;
	beforeEach(() => {
		mockedNavigator = jest.fn();
		jest.spyOn(router, 'useNavigate').mockImplementation(() => mockedNavigator);
	});
	it('must redirect to login page authomatically', () => {
		render(<Provider store={store}> {renderWithRouter(<Login />)}</Provider>);

		expect(screen.getByTestId('login-div')).toBeInTheDocument();
	});

	it('login button should be disabled by default', () => {
		render(<Provider store={store}> {renderWithRouter(<Login />)}</Provider>);
		let loginButton = screen.getByTestId('login-button');
		expect(loginButton).toBeInTheDocument();
		expect(loginButton).toBeDisabled();
	});

	it('login button should be non-disabled after entering email and password', () => {
		render(<Provider store={store}> {renderWithRouter(<Login />)}</Provider>);

		fireEvent.change(screen.getByLabelText('Email'), {
			target: { value: 'user@gmail.com' },
		});
		fireEvent.change(screen.getByLabelText('Password'), {
			target: {
				value: '12345678',
			},
		});

		let loginButton = screen.getByTestId('login-button');

		expect(loginButton).not.toBeDisabled();
	});

	//
	it('when press button sign up, it must redirect to sign up page', () => {
		render(<Provider store={store}> {renderWithRouter(<Login />)}</Provider>);
		const goToRegisterPageButton = screen.getByTestId('redirect-to-sign');
		fireEvent.click(goToRegisterPageButton);
		/* 		expect(screen.getByTestId('register-div')).toBeInTheDocument();
		 */ expect(mockedNavigator).toHaveBeenCalledWith('/register');
	});

	/* it('when press button sign up, it must redirect to sign up page', () => {
		//  Error: expect(jest.fn()).toHaveBeenCalledWith(...expected)
		//Expected: "/register"

		//now can click on button
		const goToRegisterPageButton = screen.getByTestId('redirect-to-sign');
		fireEvent.click(goToRegisterPageButton);
		expect(screen.getByText(/register/i)).toBeInTheDocument();
	});
 */
	afterAll(() => {
		mockedNavigator.mockClear();
	});
});
