import { Server } from 'socket.io';

import { createServer } from 'http';
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
	socket.on('addUser', (userID) => {
		addUser(userID, socket.id);
	});

	socket.on('server_notification', (data) => {
		io /* .to(user[0]) */.emit('client_notification', data);
	});
});

httpServer.listen(5000);
