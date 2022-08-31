import { Server } from 'socket.io';

import { createServer } from 'http';
import { Todo } from './entities/todoEntity';
import { getCurrentUser, userJoin, userLeave } from './utils';

const httpServer = createServer();

const io = new Server(httpServer, {
	cors: {
		origin: '*',
		credentials: true,
	},
});

let user: any = [];

io.on('connection', (socket) => {
	socket.on('join', (userID: string) => {
		userJoin(userID, socket.id);
		user = getCurrentUser(userID);
		socket.join(user.room);
	});
	socket.on('server_notification', (data) => {
		io.to(user.room).emit('client_notification', data);
	});
});

httpServer.listen(5000);
