import { AUTH_URL } from '../constants';

let isCalledTwice = false;

export async function callAPI(URL: string, options?: any) {
	const accessToken = localStorage.getItem('token');
	console.log('access token ' + accessToken);
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
	console.log(result);
	if (result.status === 401 && isCalledTwice === false) {
		console.log('401');
		const response = await (
			await fetch(AUTH_URL + '/refresh', {
				credentials: 'include',
			})
		).json();
		console.log(response);
		if (response.status) {
			console.log('isCalledTwice');
			return 'User is not authorized';
		}
		const { accessToken } = response;
		localStorage.setItem('token', accessToken);

		let data: any = await callAPI(URL, options);
		isCalledTwice = true;
		return data;
	}

	const finalData = await result.json();
	console.log(finalData);
	return finalData;
}
