import { OPTIONS } from '../../src/constants';
import Todo from '../models/Todo';

class TodosController {
	async fetchTodos(selectedOption: string, userID: string) {
		switch (selectedOption) {
			case OPTIONS.all: {
				return await Todo.find({ userID: userID });
			}
			case OPTIONS.active: {
				return await Todo.find({ checked: false, userID: userID });
			}
			case OPTIONS.completed: {
				return await Todo.find({ checked: true, userID: userID });
			}
		}
	}

	getTodos = async (req: any, res: any) => {
		try {
			const { userID } = req.params;
			res.send(await this.fetchTodos(req.query.filter, userID));
		} catch (err) {
			return res.json(err);
		}
	};

	addTodo = async (req: any, res: any) => {
		try {
			const { title, userID } = req.body;
			const newTodo = new Todo({
				id: Date.now(),
				text: title,
				checked: false,
				userID,
			});
			await newTodo.save();

			res.send(await this.fetchTodos(req.query.filter, userID));
		} catch (err) {
			return res.json(err);
		}
	};

	deleteTodo = async (req: any, res: any) => {
		try {
			const { userID } = req.body;
			const { id } = req.params;
			await Todo.deleteOne({ id });
			res.send(await this.fetchTodos(req.query.filter, userID));
		} catch (err) {
			return res.json(err);
		}
	};

	updateTodo = async (req: any, res: any) => {
		try {
			const { id } = req.params;
			const { changeStatus, title, isAllCompleted, userID } = req.body;

			if (changeStatus) {
				const todo: any = await Todo.findOne({ id });
				todo.checked = !todo.checked;
				await todo.save();
			} else if (title) {
				await Todo.updateOne({ id }, { text: title });
			} else {
				let status = isAllCompleted ? false : true;
				await Todo.updateMany({ userID }, { checked: status });
			}
			res.send(await this.fetchTodos(req.query.filter, userID));
		} catch (err) {
			return res.json(err);
		}
	};
}

export default new TodosController();
