import { HTTP_METHODS, DOMAIN } from '../constants';

export async function callAPI(
	path: string,
	params: string,
	body = { method: HTTP_METHODS.GET },
	id = ''
) {
	const result = await fetch(`${DOMAIN}${path}${id}${params}`, body);
	return result.json();
}
