import { myDataSource } from './../server';
import bcrypt from 'bcryptjs';
import tokenService from './tokenService';
import UserDTO from '../dtos/userDTO';
import ApiError from '../exceptions/api-error';
import { User } from '../entities/userEntity';

class UserService {
	async getCandidate(email: string) {
		return await myDataSource
			.getRepository(User)
			.createQueryBuilder()
			.where('user.email=:email', { email })
			.getOne();
	}

	async getUser(id: number) {
		return await myDataSource
			.getRepository(User)
			.createQueryBuilder()
			.where('user.id=:id', { id })
			.getOne();
	}
	async registration(email: string, username: string, password: string) {
		const candidate = await this.getCandidate(email);
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

		const result = await myDataSource
			.createQueryBuilder()
			.insert()
			.into(User)
			.values([newUserOptions])
			.execute();

		const user = await this.getUser(result.identifiers[0].id);
		const userDTO = new UserDTO(user);
		const tokens = tokenService.generateTokens({ ...userDTO });
		await tokenService.saveToken(+userDTO.id, tokens.refreshToken);

		return {
			...tokens,
			user: userDTO,
		};
	}

	async login(email: string, password: string) {
		const candidate: any = await this.getCandidate(email);
		if (!candidate) {
			throw ApiError.BadRequest('User was not found');
		}
		const isPassEqueals: any = await bcrypt.compare(password, candidate.password);
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
		try {
			console.log(refreshToken);
			if (!refreshToken) {
				throw ApiError.UnathorizedError();
			}

			const foundToken = await tokenService.findToken(refreshToken);
			if (!foundToken) {
				throw ApiError.UnathorizedError();
			}
			const user = await this.getUser(foundToken.userId);
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
