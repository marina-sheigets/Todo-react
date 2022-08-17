import { HTTP_METHODS } from '../constants';

export async function callAPI(URL: string, options = { method: HTTP_METHODS.GET }) {
	const result = await fetch(URL, options);
	return result.json();
}

/* const { fetch: originalFetch } = window;
 */
/* window.fetch = async (config: any) => {
	console.log(config);
	return config;
}; */
