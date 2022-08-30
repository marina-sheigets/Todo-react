import { Request, Response } from 'express';
import { OPTIONS } from './../../src/constants/index';
import TodoModel from '../models/Todo';
import { NOTIFICATION } from '../constants';

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
			console.log(result);
			req.sentEvent({ type: NOTIFICATION.GET_TODOS, data: result });
			return res.json('OK');
		} catch (err) {
			return res.json(err);
		}
	};

	addTodo = async (req: any, res: Response, next: any) => {
		try {
			const { title } = req.body;
			const { id: userID } = req.user;

			const newTodoOptions = {
				id: Date.now(),
				text: title,
				userId: +userID,
			};

			await TodoModel.insertTodo(newTodoOptions);
			req.sentEvent({ type: NOTIFICATION.ADD_TODO, data: newTodoOptions });
			return res.json('OK');
		} catch (err) {
			return res.json(err);
		}
	};

	deleteTodo = async (req: any, res: any) => {
		try {
			const { id } = req.params;
			await TodoModel.deleteTodoById(id);
			req.sentEvent({ type: NOTIFICATION.DELETE_TODO, data: id });
			return res.json('OK');
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
				let result = await this.fetchTodos(req.query.filter, userID);
				req.sentEvent({ type: NOTIFICATION.ALL_COMPLETED_TODOS, data: result });
				return res.json('OK');
			}
			let updatedTodo = await TodoModel.getTodoById(id);
			req.sentEvent({
				type: NOTIFICATION.UPDATE_TODO,
				data: updatedTodo,
			});
			return res.json('OK');
		} catch (err) {
			return res.json(err);
		}
	};
}

export default new TodosController();
