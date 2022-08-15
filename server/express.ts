import express from 'express';
import TodoSchema from './models/todoSchema';

const PORT = 8000;
const app = express();

app.use(express.urlencoded({ extended: true })); //for POST reqs
app.set('view engine', 'ejs');

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}...`);
});

app.get('/', (req, res) => {});

app.post;
