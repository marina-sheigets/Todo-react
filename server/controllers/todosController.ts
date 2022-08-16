import { OPTIONS } from '../../src/constants';
import Todo from '../models/Todo';

async function fetchTodos(selectedOption: string) {
	switch (selectedOption) {
		case OPTIONS.all: {
			return await Todo.find();
		}
		case OPTIONS.active: {
			return await Todo.find({ checked: false });
		}
		case OPTIONS.completed: {
			return await Todo.find({ checked: true });
		}
	}
}

export const getTodos = async (req: any, res: any) => {
	try {
		//const todos = await fetchTodos();
		res.send(await fetchTodos(req.query.filter));
	} catch (err) {
		return res.json(err);
	}
};

export const addTodo = async (req: any, res: any) => {
	try {
		const { title } = req.body;
		const newTodo = new Todo({
			id: Date.now(),
			text: title,
			checked: false,
		});
		await newTodo.save();

		res.send(await fetchTodos(req.query.filter));
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
};

export const deleteTodo = async (req: any, res: any) => {
	try {
		const { id } = req.params;
		await Todo.deleteOne({ id });
		res.send(await fetchTodos(req.query.filter));
	} catch (err) {
		return res.json(err);
	}
};

export const updateTodo = async (req: any, res: any) => {
	try {
		const { id } = req.params;
		const { changeStatus, title, active } = req.body;
		console.log(req.body);
		if (changeStatus) {
			const todo: any = await Todo.findOne({ id });
			todo.checked = !todo.checked;
			await todo.save();
		} else if (title) {
			await Todo.updateOne({ id }, { text: title });
		} else {
			let status = active ? false : true;
			await Todo.updateMany({ checked: status });
		}
		res.send(await fetchTodos(req.query.filter));
	} catch (err) {
		return res.json(err);
	}
};
