import { Router } from 'express';
import Todo from '../models/Todo';

const router = Router();

router.post('/api', async (req, res) => {
	try {
		const { item } = req.body;
		const newTodo = new Todo({
			id: Date.now(),
			text: item,
			checked: false,
		});
		console.log(req.body);
		await newTodo.save();
		/* await Todo.insertMany({
			id: Date.now(),
			text: item,
			checked: false,
		}); */
		res.status(201).json({ message: 'User was created' });
	} catch (err) {
		return res.json(err);
	}
});

export default router;
