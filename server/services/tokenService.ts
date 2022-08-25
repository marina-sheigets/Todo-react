import { scryptSync } from 'crypto';
import jwt from 'jsonwebtoken';
import { Token } from '../entities/tokenEntity';
import { myDataSource } from '../server';
/* import Token from '../models/Token';
 */
class TokenService {
	async getToken(id: number) {
		return await myDataSource
			.getRepository(Token)
			.createQueryBuilder()
			.where('token.userId=:id', { id })
			.getOne();
	}

	generateTokens(payload: any) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
			expiresIn: '10m',
		});
		const refreshToken = scryptSync(
			process.env.JWT_REFRESH_SECRET as string,
			'salt',
			64
		).toString('hex');

		return {
			accessToken,
			refreshToken,
		};
	}

	async saveToken(userId: number, refreshToken: string) {
		const tokenData = await this.getToken(userId);
		if (tokenData) {
			await myDataSource
				.getRepository(Token)
				.createQueryBuilder()
				.update()
				.set({ refreshToken })
				.where('token.userId=:userId', { userId })
				.execute();
			return tokenData;
		}

		const newTokenOptions = {
			refreshToken,
			userId,
		};

		const token = await myDataSource
			.createQueryBuilder()
			.insert()
			.into(Token)
			.values([newTokenOptions])
			.execute();
		console.log(token);
		return token;
	}

	async removeToken(refreshToken: string) {
		const tokenData = await myDataSource
			.createQueryBuilder()
			.delete()
			.from(Token)
			.where('token.refreshToken=:refreshToken', { refreshToken })
			.execute();
		return tokenData;
	}

	async findToken(refreshToken: string) {
		const tokenData = await myDataSource
			.getRepository(Token)
			.createQueryBuilder()
			.where('token.refreshToken=:refreshToken', { refreshToken })
			.getOne();
		return tokenData;
	}

	validateAccessToken(token: string) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
			return userData;
		} catch (err) {
			return null;
		}
	}
}

export default new TokenService();
