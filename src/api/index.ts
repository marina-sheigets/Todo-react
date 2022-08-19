import { AUTH_URL, HTTP_METHODS } from '../constants';

export async function callAPI(URL: string, options = { method: HTTP_METHODS.GET }) {
	const finalOptions: any = {
		...options,
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	};
	const result = await (await fetch(URL, finalOptions)).json();
	return result;
}

let isCalledTwice = false; //to stop infinite loop
//fetch interceptor
const { fetch: originalFetch } = window;

window.fetch = async (...args) => {
	const URL = args[0];
	const options = args[1];
	let response = await originalFetch(URL, options);

	if (response.status === 401 && !isCalledTwice) {
		isCalledTwice = true;
		const tokens = await fetch(AUTH_URL + '/refresh', {
			credentials: 'include',
		});
		const { accessToken } = await tokens.json();
		localStorage.setItem('token', accessToken);

		//send original request with new access token
		let response = await originalFetch(URL, {
			...options,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		return response;
	}
	return response;
};
