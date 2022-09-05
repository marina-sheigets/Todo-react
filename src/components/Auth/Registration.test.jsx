import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithRouter } from '../../utils';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { MemoryRouter } from 'react-router';
import App from '../../App';

describe('Registration component', () => {
	beforeAll(() => {
		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/register']}>
					<App />
				</MemoryRouter>
			</Provider>
		);
	});

	it('registration page exists', () => {
		expect(screen.getByText(/register/i)).toBeInTheDocument();
		screen.debug();
	});
	/* 
	it('Register button should be disabled by default', () => {
		let registerButton = screen.getByTestId('register-button');
		screen.debug(registerButton);
		expect(registerButton).toBeInTheDocument();
		expect(registerButton).toBeDisabled();
	}); */
});
