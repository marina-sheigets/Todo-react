import express from 'express';
import mongoose from 'mongoose';
import { URL_MONGO, PORT } from './constants';
import TodosRouter from './routes/todosItems';

const app = express();

//connect to mongoDB
mongoose
	.connect(URL_MONGO)
	.then(() => console.log('Connected'))
	.catch(console.log);

app.use(express.json()); //for POST reqs
app.set('view engine', 'ejs');

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}...`);
});

app.use('/todos', TodosRouter);
