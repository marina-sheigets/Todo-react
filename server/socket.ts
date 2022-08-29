import { httpServer } from './server';
import { Server } from 'socket.io';

/*export  const io = new Server(httpServer, {
	serveClient: false,
	cors: {
		origin: 'http://localhost:3000',
		credentials: true,
	},
});

let user: any = [];

const addUser = (userID: string, socketID: string) => {
	!user.some((item: any) => item.userID === userID) && user.push({ userID, socketID });
};

io.on('connection', (socket) => {
	console.log('sockets work');

	socket.on('addUser', (userID) => {
		console.log('addUser');
		addUser(userID, socket.id);
	});
});
 */
