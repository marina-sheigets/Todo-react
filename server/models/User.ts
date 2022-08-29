import { User } from '../entities/userEntity';
import { db } from '../mysql';

class UserModel {
	async getUserByEmail(email: string) {
		return await db
			.getRepository(User)
			.createQueryBuilder()
			.where('user.email=:email', { email })
			.getOne();
	}

	async getUserById(id: number) {
		return await db
			.getRepository(User)
			.createQueryBuilder()
			.where('user.id=:id', { id })
			.getOne();
	}

	async insertUser(newUserOptions: any) {
		return await db.createQueryBuilder().insert().into(User).values([newUserOptions]).execute();
	}
}

export default new UserModel();
