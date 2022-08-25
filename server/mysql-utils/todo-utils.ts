import { Todo } from '../entities/todoEntity';
import { myDataSource } from '../server';

class TodoUtils {
	async getAllTodos(status: string | boolean, userId: string) {
		console.log('getAll', userId);
		return await myDataSource
			.getRepository(Todo)
			.createQueryBuilder()
			.where('todo.checked=:checked', { checked: status })
			.andWhere('todo.userId=:userId', { userId: userId })
			.getMany();
	}
}

export default new TodoUtils();
