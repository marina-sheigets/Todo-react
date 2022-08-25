/*
app.get('/', (req, res) => {
	const id = Date.now();
	console.log(id);

	console.log(typeof id);
	const sqlInsert = `INSERT INTO todos (id,text,checked) VALUES (?,"Buy the butter",false)`;
	db.query(sqlInsert, [id], (err, res) => {
		console.log(err);
	});
	res.send('Inserted');
});

app.listen(3002, () => {
	console.log('Server is listening on port 3002');
});
*/
