import User from '../models/User';
import bcrypt from 'bcryptjs';
import tokenService from './tokenService';
import UserDTO from '../dtos/userDTO';
import ApiError from '../exceptions/api-error';
import jwt from 'jsonwebtoken';

class UserService {
	async registration(email: string, username: string, password: string) {
		const candidate = await User.findOne({ email });
		if (candidate) {
			throw ApiError.BadRequest(`User with ${email} does'nt exists`);
		}
		const hashPassword = await bcrypt.hash(password, 4);
		const user = await User.create({ email, username, password: hashPassword });

		const userDTO = new UserDTO(user);
		const tokens = tokenService.generateTokens({ ...userDTO });
		await tokenService.saveToken(userDTO.id, tokens.refreshToken);

		return {
			...tokens,
			user: userDTO,
		};
	}

	async login(email: string, username: string, password: string) {
		const candidate = await User.findOne({ email, username });
		if (!candidate) {
			throw ApiError.BadRequest('User was not found');
		}
		const isPassEqueals = await bcrypt.compare(password, candidate.password);
		if (!isPassEqueals) {
			throw ApiError.BadRequest('Incorrect password');
		}

		const userDTO = new UserDTO(candidate);
		const tokens = tokenService.generateTokens({ ...userDTO });
		await tokenService.saveToken(userDTO.id, tokens['refreshToken']);

		return {
			...tokens,
			user: userDTO,
		};
	}

	async logout(refreshToken: string) {
		const token = await tokenService.removeToken(refreshToken);
		return token;
	}

	async refresh(refreshToken: string) {
		if (!refreshToken) {
			throw ApiError.UnathorizedError();
		}
		const userData: any = tokenService.validateRefreshToken(refreshToken);
		const foundToken = await tokenService.findToken(refreshToken);
		if (!userData || !foundToken) {
			throw ApiError.UnathorizedError();
		}
		const user = await User.findById(userData.id);

		const userDTO = new UserDTO(user);
		const tokens = tokenService.generateTokens({ ...userDTO });
		await tokenService.saveToken(userDTO.id, tokens['refreshToken']);

		return {
			...tokens,
			user: userDTO,
		};
	}
}

export default new UserService();
