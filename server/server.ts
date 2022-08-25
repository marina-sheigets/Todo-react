import bodyParser from 'body-parser';
import express from 'express';
import AuthRouter from './routes/users';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import errorMiddleware from './middleware/errorMiddleware';
import mysql from 'mysql';
import { DataSource, QueryBuilder } from 'typeorm';
import { User } from './entities/userEntity';
import { Todo } from './entities/todoEntity';
import { Token } from './entities/tokenEntity';
import TodosRouter from './routes/todos';

const app = express();
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
);
app.use(errorMiddleware);

//routes
app.use('/todos', TodosRouter);
app.use('/auth', AuthRouter);

//connect to mongoDB
export const myDataSource = new DataSource({
	type: 'mysql',
	host: 'localhost',
	port: 3306, //default
	username: 'root',
	password: 'password',
	database: 'todoapp',
	synchronize: true,
	entities: [User, Todo, Token],
	logging: true,
});

myDataSource
	.initialize()
	.then(() => {
		console.log('Initialized');
	})
	.catch((err) => console.log('Error' + err));

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}...`);
});
