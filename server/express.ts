import express from 'express';

const PORT = 8000;
const app = express();

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}...`);
});

app.get('/', (req, res) => {
	res.send([1, 2, 4]);
});
