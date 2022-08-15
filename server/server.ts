import http from 'http';
import { MongoClient } from 'mongodb';
import url from 'url';
import { IBodyContent } from '../src/types';
import { HTTP_METHODS, OPTIONS } from '../src/constants';
import { URL_MONGO, DB_NAME, COLLECTION, PORT } from './constants';

const client = new MongoClient(URL_MONGO);

client.connect();

const getTodosCollection = () => client.db(DB_NAME).collection(COLLECTION);

async function getTodos(selectedOption: string) {
	switch (selectedOption) {
		case OPTIONS.active: {
			return await getTodosCollection().find({ checked: false }).toArray();
		}
		case OPTIONS.completed: {
			return await getTodosCollection().find({ checked: true }).toArray();
		}
		default: {
			return await getTodosCollection().find({}).toArray();
		}
	}
}

async function mongoAddTodo(bodyObject: IBodyContent, selectedOption: string) {
	const newTodo = {
		id: Date.now(),
		text: bodyObject.title,
		checked: false,
	};

	await getTodosCollection().insertOne(newTodo);
	return await getTodos(selectedOption);
}

async function deleteTodo(id: number, selectedOption: string) {
	await getTodosCollection().deleteOne({ id });
	return await getTodos(selectedOption);
}

async function updateTodoText(bodyObject: IBodyContent, id: number, selectedOption: string) {
	await getTodosCollection().updateOne({ id }, { $set: { text: bodyObject.title } });
	return await getTodos(selectedOption);
}

async function changeStatus(id: number, selectedOption: string) {
	const todo = await getTodosCollection().findOne({ id });
	const checked = todo?.checked;
	await getTodosCollection().updateOne({ id }, { $set: { checked: !checked } });
	return await getTodos(selectedOption);
}

async function changeStatusAll(bodyObject: IBodyContent, selectedOption: string) {
	if (bodyObject.active) {
		await getTodosCollection().updateMany({}, { $set: { checked: false } });
	} else {
		await getTodosCollection().updateMany({}, { $set: { checked: true } });
	}
	return await getTodos(selectedOption);
}

const server = http.createServer();

function getID(req: any) {
	const lastIndex = req.url.lastIndexOf('/');
	const indexOfParamsStart = req.url.lastIndexOf('?');
	const id = +req.url.slice(lastIndex + 1, indexOfParamsStart);
	return id;
}

server.listen(PORT);

server.on('request', async (request, response) => {
	const URL = `http://localhost:${PORT}${request.url}`;
	const regex = /http:\/\/[a-z]*:[0-9]*\/todos/;

	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, DELETE, PATCH',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
	};

	if (regex.test(URL)) {
		switch (request.method) {
			case HTTP_METHODS.GET:
				response.writeHead(200, headers);
				try {
					const selectedOption: any = url.parse(URL, true).query.filter;
					const res = await getTodos(selectedOption);
					response.end(JSON.stringify(res));
				} catch (err) {
					console.log(err);
				}
				break;

			case HTTP_METHODS.POST: {
				response.writeHead(200, {
					...headers,
					'Content-Type': 'application/json',
				});
				let data = '';
				request.on('data', (chunk) => {
					data += chunk;
				});

				request.on('end', async () => {
					const bodyObject: IBodyContent = JSON.parse(data);
					try {
						const selectedOption: any = url.parse(URL, true).query.filter;
						const res = await mongoAddTodo(bodyObject, selectedOption);
						response.end(JSON.stringify(res));
					} catch (e) {
						console.log(e);
					}
				});

				break;
			}
			case HTTP_METHODS.PATCH: {
				response.writeHead(200, {
					...headers,
					'Content-Type': 'application/json',
				});
				const id = getID(request);
				let str = '';

				request.on('data', (chunk) => {
					str += chunk;
				});
				request.on('end', async () => {
					const bodyObject: IBodyContent = JSON.parse(str);
					if (Object.prototype.hasOwnProperty.call(bodyObject, 'changeStatus')) {
						try {
							const selectedOption: any = url.parse(URL, true).query.filter;
							const res = await changeStatus(id, selectedOption);
							response.end(JSON.stringify(res));
						} catch (e) {
							console.log(e);
						}
					} else if (Object.prototype.hasOwnProperty.call(bodyObject, 'title')) {
						try {
							const selectedOption: any = url.parse(URL, true).query.filter;

							const res = await updateTodoText(bodyObject, id, selectedOption);
							response.end(JSON.stringify(res));
						} catch (e) {
							console.log(e);
						}
					} else if (
						Object.prototype.hasOwnProperty.call(bodyObject, 'changeStatusAll')
					) {
						try {
							const selectedOption: any = url.parse(URL, true).query.filter;

							const res = await changeStatusAll(bodyObject, selectedOption);
							response.end(JSON.stringify(res));
						} catch (e) {
							console.log(e);
						}
					}
				});
				break;
			}
			case HTTP_METHODS.DELETE: {
				response.writeHead(200, headers);
				const i = getID(request);
				try {
					const selectedOption: any = url.parse(URL, true).query.filter;

					const res = await deleteTodo(i, selectedOption);
					response.end(JSON.stringify(res));
				} catch (e) {
					console.log(e);
				}

				break;
			}
			case HTTP_METHODS.OPTIONS:
				response.writeHead(200, {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, PATCH',
					'Access-Control-Allow-Headers':
						'Origin, X-Requested-With, Content-Type, Accept',
				});
				response.end();
				break;
			default:
				response.writeHead(405, {
					'Content-Type': 'application/json',
				});
				response.end(
					JSON.stringify({
						error: `method ${request.method} not allowed`,
					})
				);
				break;
		}
	} else {
		response.end('Page was not found...');
	}
});
