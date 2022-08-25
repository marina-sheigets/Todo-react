import bodyParser from 'body-parser';
import express from 'express';
import AuthRouter from './routes/users';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import errorMiddleware from './middleware/errorMiddleware';
import TodosRouter from './routes/todos';
import { db } from './mysql';

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

db.initialize()
	.then(() => {
		console.log('Initialized');
	})
	.catch((err) => console.log('Error' + err));

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}...`);
});
