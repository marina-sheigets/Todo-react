import { Server } from 'socket.io';

import { createServer } from 'http';
import { GET_TODOS_EVENT } from './constants';
import { Todo } from './entities/todoEntity';

const httpServer = createServer();

const io = new Server(httpServer, {
	cors: {
		origin: '*',
		credentials: true,
	},
});

let user: any = [];
let todos: Todo[] = [];

const addUser = (userID: string, socketID: string) => {
	!user.some((item: any) => item.userID === userID) && user.push({ userID, socketID });
};

io.on('connection', (socket) => {
	console.log('sockets work');

	socket.on('addUser', (userID) => {
		console.log('addUser');
	});

	socket.on(GET_TODOS_EVENT, (data) => {
		todos = [...data];
		console.log(todos);
	});
	socket.on('notification', () => {
		io.emit('todos', todos);
	});
});

httpServer.listen(5000);
