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
app.use((req: any, res, next) => {
	req.sentEvent = (object: any) => {
		socket.emit('server_notification', object);
	};
	next();
});
//routes
app.use('/todos', TodosRouter);
app.use('/auth', AuthRouter);

db.initialize()
	.then(() => {
		console.log('Initialized');
	})
	.catch((err) => console.log('Error' + err));

httpServer.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}...`);
});
