import { OPTIONS } from '../../src/constants';
import { Todo } from '../entities/todoEntity';
import { Token } from '../entities/tokenEntity';
import { User } from '../entities/userEntity';
import { myDataSource } from '../server';

class TodosController {
	async fetchTodos(selectedOption: string, userId: string) {
		let status: string | boolean = 'any';
		if (selectedOption === 'Completed') {
			status = true;
		} else if (selectedOption === 'Active') {
			status = false;
		}

		if (status !== 'any') {
			return await myDataSource
				.getRepository(Todo)
				.createQueryBuilder()
				.where('todo.checked=:checked', { checked: status })
				.andWhere('todo.userId=:userId', { userId })
				.getRawMany();
		}

		return await myDataSource
			.getRepository(Todo)
			.createQueryBuilder()
			.where('todo.userId=:userId', { userId })
			.getRawMany();
	}

	getTodos = async (req: any, res: any) => {
		try {
			const { userID } = req.params;
			let result = await this.fetchTodos(req.query.filter, userID);
			res.send(result);
		} catch (err) {
			console.log(err);
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

			await myDataSource
				.createQueryBuilder()
				.insert()
				.into(Todo)
				.values([newTodoOptions])
				.execute();

			const todos = await myDataSource.getRepository(Todo).createQueryBuilder().getMany();

			res.send(await this.fetchTodos(req.query.filter, userID));
		} catch (err) {
			return res.json(err);
		}
	};

	deleteTodo = async (req: any, res: any) => {
		try {
			const { userID } = req.body;
			const { id } = req.params;
			await myDataSource
				.createQueryBuilder()
				.delete()
				.from(Todo)
				.where('todo.id=:id', { id })
				.execute();
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
				const todo: any = await myDataSource
					.getRepository(Todo)
					.createQueryBuilder()
					.where('todo.id=:id', { id })
					.getOne();
				console.log(todo);

				await myDataSource
					.getRepository(Todo)
					.createQueryBuilder()
					.update()
					.set({ checked: !todo.checked })
					.where('todo.id=:id', { id })
					.execute();
			} else if (title) {
				await myDataSource
					.getRepository(Todo)
					.createQueryBuilder()
					.update()
					.set({ text: title })
					.where('todo.id=:id', { id })
					.execute();
			} else {
				let status = isAllCompleted ? false : true;
				await myDataSource
					.getRepository(Todo)
					.createQueryBuilder()
					.update()
					.set({ checked: status })
					.execute();
			}
			res.send(await this.fetchTodos(req.query.filter, userID));
		} catch (err) {
			return res.json(err);
		}
	};
}

export default new TodosController();
