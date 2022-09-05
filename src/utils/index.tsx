import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import store from '../redux/store';
export default function actionCreator(actionName: string) {
	return {
		REQUEST: `${actionName}_REQUEST`,
		SUCCESS: `${actionName}_SUCCESS`,
		FAIL: `${actionName}_FAIL`,
	};
}

export const getURL = (selectedOption: any, id?: string) => {
	if (id) return `/todos/${id}?filter=${selectedOption}`;

	return `/todos?filter=${selectedOption}`;
};

export const renderWithRouter = (component: any, initialRoute: string) => {
	return (
		<Provider store={store}>
			<MemoryRouter initialEntries={[initialRoute]}>
				<App />
				{component}
			</MemoryRouter>
		</Provider>
	);
};
