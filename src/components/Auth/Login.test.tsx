import { fireEvent, getByText, render, screen } from '@testing-library/react';
import store from '../../redux/store';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import * as router from 'react-router';

describe('TodoMain component', () => {
	let mockedNavigator: any;
	beforeEach(() => {
		mockedNavigator = jest.fn();
		jest.spyOn(router, 'useNavigate').mockImplementation(() => mockedNavigator);

		render(
			<Provider store={store}>
				<BrowserRouter>
					<Login />
				</BrowserRouter>
			</Provider>
		);
	});
	it('must redirect to login page authomatically', () => {
		expect(screen.getByTestId('login-div')).toBeInTheDocument();
	});

	it('login button should be disabled by default', () => {
		let loginButton = screen.getByTestId('login-button');
		expect(loginButton).toBeInTheDocument();
		expect(loginButton).toBeDisabled();
	});

	it('login button should be non-disabled after entering email and password', () => {
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
	/* it('when press button sign up, it must redirect to sign up page', () => {
		const goToRegisterPageButton = screen.getByTestId('redirect-to-sign');
		fireEvent.click(goToRegisterPageButton);
		expect(mockedNavigator).toHaveBeenCalledWith('/register');
	}); */

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
