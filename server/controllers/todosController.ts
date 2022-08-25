import { OPTIONS } from './../../src/constants/index';
import TodoModel from '../models/Todo';

class TodosController {
	async fetchTodos(selectedOption: string, userId: string) {
		let status: string | boolean = OPTIONS.all;
		if (selectedOption === OPTIONS.completed) {
			status = true;
		} else if (selectedOption === OPTIONS.active) {
			status = false;
		}

		if (status !== OPTIONS.all) {
			return await TodoModel.getAllTodosByCheckedField(status, userId);
		}

		return await TodoModel.getAllTodosByUserId(userId);
	}

	getTodos = async (req: any, res: any) => {
		try {
			const { userID } = req.params;
			let result = await this.fetchTodos(req.query.filter, userID);
			res.send(result);
		} catch (err) {
			return res.json(err);
		}
	};

	addTodo = async (req: any, res: any) => {
		try {
			const { title, userID } = req.body;

			const newTodoOptions = {
				id: Date.now(),
				text: title,
				userId: +userID,
			};

			await TodoModel.insertTodo(newTodoOptions);

			res.send(await this.fetchTodos(req.query.filter, userID));
		} catch (err) {
			return res.json(err);
		}
	};

	deleteTodo = async (req: any, res: any) => {
		try {
			const { userID } = req.body;
			const { id } = req.params;
			await TodoModel.deleteTodoById(id);
			res.send(await this.fetchTodos(req.query.filter, userID));
		} catch (err) {
			return res.json(err);
		}
	};

	updateTodo = async (req: any, res: any) => {
		try {
			const { id } = req.params;
			const { changeStatus, title, isAllCompleted, userID } = req.body;
			console.log('changeStatus:' + changeStatus, 'id:' + id);
			if (changeStatus) {
				const todo: any = await TodoModel.getTodoById(id);
				console.log(todo);
				await TodoModel.updateTodoCheckedById(id, !todo.checked);
			} else if (title) {
				await TodoModel.updateTodoTextById(id, title);
			} else {
				let status = isAllCompleted ? false : true;
				await TodoModel.updateAllTodosChecked(status);
			}
			res.send(await this.fetchTodos(req.query.filter, userID));
		} catch (err) {
			return res.json(err);
		}
	};
}

export default new TodosController();
