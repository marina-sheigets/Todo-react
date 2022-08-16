import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import { URL_MONGO, PORT } from './constants';
import TodosRouter from './routes/todos';
import cors from 'cors';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

//connect to mongoDB
mongoose
	.connect(URL_MONGO)
	.then(() => console.log('Connected'))
	.catch(console.log);

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}...`);
});

app.use('/todos', TodosRouter);
