import { HTTP_METHODS } from '../constants';

export async function callAPI(URL: string, options = { method: HTTP_METHODS.GET }) {
	const result = await fetch(URL, options);
	return result.json();
}
