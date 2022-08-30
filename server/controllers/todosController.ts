import { Request, Response } from 'express';
import { OPTIONS } from './../../src/constants/index';
import TodoModel from '../models/Todo';
import { GET_TODOS_EVENT } from '../constants';
import { socket } from '../server';

class TodosController {
	async fetchTodos(selectedOption: any, userId: string) {
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

	getTodos = async (req: any, res: Response) => {
		try {
			const { id: userID } = req.user;
			let result = await this.fetchTodos(req.query.filter, userID);
			socket.emit(GET_TODOS_EVENT, result);
			res.send(result);
		} catch (err) {
			return res.json(err);
		}
	};

	addTodo = async (req: any, res: any) => {
		try {
			const { title } = req.body;
			const { id: userID } = req.user;

			const newTodoOptions = {
				id: Date.now(),
				text: title,
				userId: +userID,
			};

			await TodoModel.insertTodo(newTodoOptions);
			let result = await this.fetchTodos(req.query.filter, userID);
			socket.emit(GET_TODOS_EVENT, result);

			res.send(result);
		} catch (err) {
			return res.json(err);
		}
	};

	deleteTodo = async (req: any, res: any) => {
		try {
			const { id: userID } = req.user;
			const { id } = req.params;
			await TodoModel.deleteTodoById(id);
			let result = await this.fetchTodos(req.query.filter, userID);
			socket.emit(GET_TODOS_EVENT, result);

			res.send(result);
		} catch (err) {
			return res.json(err);
		}
	};

	updateTodo = async (req: any, res: any) => {
		try {
			const { id } = req.params;
			const { changeStatus, title, isAllCompleted } = req.body;
			const { id: userID } = req.user;

			if (changeStatus) {
				const todo: any = await TodoModel.getTodoById(id);
				await TodoModel.updateTodoCheckedById(id, !todo.checked);
			} else if (title) {
				await TodoModel.updateTodoTextById(id, title);
			} else {
				let status = isAllCompleted ? false : true;
				await TodoModel.updateAllTodosChecked(status);
			}
			let result = await this.fetchTodos(req.query.filter, userID);
			socket.emit(GET_TODOS_EVENT, result);
			res.send(result);
		} catch (err) {
			return res.json(err);
		}
	};
}

export default new TodosController();
