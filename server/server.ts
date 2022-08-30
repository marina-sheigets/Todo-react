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
import { io } from 'socket.io-client';

const PORT = process.env.PORT || 5000;
const app = express();

export const socket = io('ws://localhost:5000', {
	withCredentials: true,
});

const httpServer = createServer(app);

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
/* app.use((req: any, res, next) => {
	req.io = io;
	next();
}); */
//routes
app.use('/todos', TodosRouter);
app.use('/auth', AuthRouter);

db.initialize()
	.then(() => {
		console.log('Initialized');
	})
	.catch((err) => console.log('Error' + err));

let user: any = [];

const addUser = (userID: string, socketID: string) => {
	!user.some((item: any) => item.userID === userID) && user.push({ userID, socketID });
};

/* 
io.on('connection', (socket) => {
	console.log('user is connected');
	global.socket = socket; */
//socket.emit("event","hello");
//socket.on(ADD_TODO_EVENT, todosController.addTodo);
/*
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
	}); */
/* }); */

httpServer.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}...`);
});
