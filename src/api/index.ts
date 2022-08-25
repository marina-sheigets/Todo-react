import { AUTH_PATH, AUTH_URL, BASE_URL } from '../constants';

let isCalledTwice = false;

export async function callAPI(PATH: string, options?: any) {
	console.log(PATH, options);
	const accessToken = localStorage.getItem('token');
	const URL = BASE_URL + PATH;
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
		console.log(401);
		const response = await (
			await fetch(AUTH_URL + '/refresh', {
				credentials: 'include',
			})
		).json();

		if (response.status) {
			console.log('isCalledTwice');
			return 'User is not authorized';
		}
		const { accessToken } = response;
		localStorage.setItem('token', accessToken);
		let data: any = await callAPI(PATH, options);
		return data;
	}

	const finalData = await result.json();
	return finalData;
}
