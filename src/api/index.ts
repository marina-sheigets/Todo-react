import { AUTH_URL } from '../constants';

export async function callAPI(URL: string, options?: any) {
	const accessToken = localStorage.getItem('token');
	const finalOptions: any = {
		...options,
		credentials: 'include',
		headers: {
			...(options.headers || {}),
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	};
	const result = await fetch(URL, finalOptions);

	if (result.status === 401) {
		const tokens = await fetch(AUTH_URL + '/refresh', {
			credentials: 'include',
		});
		const { accessToken } = await tokens.json();
		localStorage.setItem('token', accessToken);

		let response: any = await callAPI(URL, options);
		return response;
	}
	const userData = await result.json();
	return userData;
}
