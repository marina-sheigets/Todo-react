import jwt from 'jsonwebtoken';
import Token from '../models/Token';

class TokenService {
	generateTokens(payload: any) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
			expiresIn: '10s',
		});
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
			expiresIn: '30d',
		});

		return {
			accessToken,
			refreshToken,
		};
	}

	async saveToken(userId: number, refreshToken: string) {
		const tokenData = await Token.findOne({ user: userId });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}

		const token = await Token.create({ user: userId, refreshToken });
		return token;
	}

	async removeToken(refreshToken: string) {
		const tokenData = await Token.deleteOne({ refreshToken });
		return tokenData;
	}

	async findToken(refreshToken: string) {
		const tokenData = await Token.findOne({ refreshToken });
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

	validateRefreshToken(token: string) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
			return userData;
		} catch (err) {
			return null;
		}
	}
}

export default new TokenService();
