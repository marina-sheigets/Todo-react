import { Todo } from '../entities/todoEntity';
import { db } from '../mysql';

class TodoModel {
	async getAllTodosByCheckedField(status: string | boolean, userId: string) {
		console.log(status, userId);
		return await db
			.getRepository(Todo)
			.createQueryBuilder()
			.where('todo.checked=:checked', { checked: status })
			.andWhere('todo.userId=:userId', { userId })
			.getRawMany();
	}

	async getAllTodosByUserId(userId: string) {
		return await db
			.getRepository(Todo)
			.createQueryBuilder()
			.where('todo.userId=:userId', { userId })
			.getRawMany();
	}

	async getTodoById(id: string) {
		return await db
			.getRepository(Todo)
			.createQueryBuilder()
			.where('todo.id=:id', { id })
			.getOne();
	}

	async insertTodo(newTodoOptions: any) {
		await db.createQueryBuilder().insert().into(Todo).values([newTodoOptions]).execute();
	}

	async deleteTodoById(id: number) {
		await db.createQueryBuilder().delete().from(Todo).where('todo.id=:id', { id }).execute();
	}

	async updateTodoCheckedById(id: number, checked: boolean) {
		console.log(id, checked);
		return await db
			.getRepository(Todo)
			.createQueryBuilder()
			.update()
			.set({ checked })
			.where('todo.id=:id', { id })
			.execute();
	}

	async updateTodoTextById(id: number, text: string) {
		return db
			.getRepository(Todo)
			.createQueryBuilder()
			.update()
			.set({ text })
			.where('todo.id=:id', { id })
			.execute();
	}

	async updateAllTodosChecked(status: boolean) {
		return await db
			.getRepository(Todo)
			.createQueryBuilder()
			.update()
			.set({ checked: status })
			.execute();
	}
}

export default new TodoModel();
