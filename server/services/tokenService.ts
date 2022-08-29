import { scryptSync } from 'crypto';
import jwt from 'jsonwebtoken';
import TokenModel from '../models/Token';

class TokenService {
	async getToken(id: number) {
		return await TokenModel.getTokenById(id);
	}

	generateTokens(payload: any) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
			expiresIn: '10s',
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
			await TokenModel.updateToken(refreshToken, userId);
			return tokenData;
		}

		const newTokenOptions = {
			refreshToken,
			userId,
		};

		const token = await TokenModel.insertToken(newTokenOptions);
		return token;
	}

	async removeToken(refreshToken: string) {
		await TokenModel.deleteToken(refreshToken);
	}

	async findToken(refreshToken: string) {
		const tokenData = await TokenModel.getTokenByRefreshField(refreshToken);

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
