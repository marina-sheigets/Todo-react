import bodyParser from 'body-parser';
import express from 'express';
import AuthRouter from './routes/users';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import errorMiddleware from './middleware/errorMiddleware';
import TodosRouter from './routes/todos';
import { db } from './mysql';
import { createServer } from 'http';
import { Server } from 'socket.io';
import TodoModel from './models/Todo';
import todosController from './controllers/todosController';
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
);
app.use(errorMiddleware);

export const httpServer = createServer(app);

//routes
app.use('/todos', TodosRouter);
app.use('/auth', AuthRouter);

db.initialize()
	.then(() => {
		console.log('Initialized');
	})
	.catch((err) => console.log('Error' + err));

const io = new Server(httpServer, {
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

io.sockets.on('connection', (socket) => {
	socket.on('addUser', (userID) => {
		addUser(userID, socket.id);
	});

	socket.on('addTodo', async (payload) => {
		console.log('add todo sokcet');

		try {
			const { title, selectedOption, userID } = payload;
			console.log('addTodoSocket');
			const newTodoOptions = {
				id: Date.now(),
				text: title,
				userId: +userID,
			};

			await TodoModel.insertTodo(newTodoOptions);
			socket.emit('addTodoSuccess', await todosController.fetchTodos(selectedOption, userID));
			//res.send(await this.fetchTodos(req.query.filter, userID));
		} catch (err) {
			console.log(err);
			//return res.json(err);
		}
	});
});

httpServer.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}...`);
});

/* const wss = new Server(server, {
	cors: {
		origin: process.env.CLIENT_URL,
	},
});
 */
