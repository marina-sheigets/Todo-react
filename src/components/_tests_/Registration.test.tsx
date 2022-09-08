import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithRouter } from '../../utils';
import * as router from 'react-router';
import Registration from '../Auth/Registration';
import { Provider } from 'react-redux';
import store from '../../redux/store';

describe('Registration component', () => {
	let mockedNavigator: any;

	beforeAll(() => {
		mockedNavigator = jest.fn();
		jest.spyOn(router, 'useNavigate').mockImplementation(() => mockedNavigator);
	});

	it('registration page exists', () => {
		render(<Provider store={store}>{renderWithRouter(<Registration />)}</Provider>);
		expect(screen.getByText(/register/i)).toBeInTheDocument();
	});

	it('Register button should be disabled by default', () => {
		render(<Provider store={store}>{renderWithRouter(<Registration />)}</Provider>);
		const registerButton = screen.getByText(/register/i);
		expect(registerButton).toBeInTheDocument();
		expect(registerButton).toBeDisabled();
	});

	/* it('when press Log in, it must redirect to Login Page', () => {
		render(renderWithRouter(<Registration />));
		const redirectToLoginButton = screen.getByTestId('redirect-to-login');
		fireEvent.click(redirectToLoginButton);
		expect(screen.getByTestId('login-div')).toBeInTheDocument();
	}); */
});
