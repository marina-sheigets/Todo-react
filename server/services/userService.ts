import { db } from './../mysql';
import bcrypt from 'bcryptjs';
import tokenService from './tokenService';
import UserDTO from '../dtos/userDTO';
import ApiError from '../exceptions/api-error';
import { User } from '../entities/userEntity';
import UserModel from '../models/User';

class UserService {
	async registration(email: string, username: string, password: string) {
		const candidate = await UserModel.getUserByEmail(email);
		if (candidate) {
			throw ApiError.BadRequest(`User with ${email} exists`);
		}

		const hashPassword = await bcrypt.hash(password, 4);
		const newUserOptions = {
			id: Date.now(),
			email,
			username,
			password: hashPassword,
		};

		const result = await UserModel.insertUser(newUserOptions);

		const user = await UserModel.getUserById(result.identifiers[0].id);
		const userDTO = new UserDTO(user);
		const tokens = tokenService.generateTokens({ ...userDTO });
		await tokenService.saveToken(+userDTO.id, tokens.refreshToken);

		return {
			...tokens,
			user: userDTO,
		};
	}

	async login(email: string, password: string) {
		const candidate: any = await UserModel.getUserByEmail(email);
		if (!candidate) {
			throw ApiError.BadRequest('User was not found');
		}
		const isPassEqueals: any = await bcrypt.compare(password, candidate.password);
		if (!isPassEqueals) {
			throw ApiError.BadRequest('Incorrect password');
		}

		const userDTO = new UserDTO(candidate);
		const tokens = tokenService.generateTokens({ ...userDTO });
		console.log(tokens);
		await tokenService.saveToken(userDTO.id, tokens['refreshToken']);

		return {
			...tokens,
			user: userDTO,
		};
	}

	async logout(refreshToken: string) {
		await tokenService.removeToken(refreshToken);
	}

	async refresh(refreshToken: string) {
		try {
			console.log(refreshToken);
			if (!refreshToken) {
				throw ApiError.UnathorizedError();
			}

			const foundToken = await tokenService.findToken(refreshToken);
			if (!foundToken) {
				throw ApiError.UnathorizedError();
			}
			const user = await UserModel.getUserById(foundToken.userId);
			const userDTO = new UserDTO(user);
			const tokens = tokenService.generateTokens({ ...userDTO });
			await tokenService.saveToken(userDTO.id, tokens['refreshToken']);

			return {
				...tokens,
				user: userDTO,
			};
		} catch (err: any) {
			return err.status;
		}
	}
}

export default new UserService();
