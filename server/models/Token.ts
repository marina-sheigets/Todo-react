import { Token } from './../entities/tokenEntity';
import { db } from '../mysql';

class TokenModel {
	async getTokenById(id: number) {
		return await db
			.getRepository(Token)
			.createQueryBuilder()
			.where('token.userId=:id', { id })
			.getOne();
	}

	async getTokenByRefreshField(refreshToken: string) {
		return await db
			.getRepository(Token)
			.createQueryBuilder()
			.where('token.refreshToken=:refreshToken', { refreshToken })
			.getOne();
	}

	async updateToken(refreshToken: string, userId: number) {
		return await db
			.getRepository(Token)
			.createQueryBuilder()
			.update()
			.set({ refreshToken })
			.where('token.userId=:userId', { userId })
			.execute();
	}

	async insertToken(newTokenOptions: any) {
		return await db
			.createQueryBuilder()
			.insert()
			.into(Token)
			.values([newTokenOptions])
			.execute();
	}

	async deleteToken(refreshToken: string) {
		return await db
			.createQueryBuilder()
			.delete()
			.from(Token)
			.where('token.refreshToken=:refreshToken', { refreshToken })
			.execute();
	}
}

export default new TokenModel();
