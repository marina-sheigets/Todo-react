import userService from '../services/userService';
import { validationResult } from 'express-validator';
import ApiError from '../exceptions/api-error';

class authController {
	async registration(req: any, res: any, next: any) {
		try {
			const errors: any = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Validation error', errors.array()));
			}
			const { email, username, password } = req.body;
			const userData = await userService.registration(email, username, password);
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: false,
			});
			return res.json(userData);
		} catch (err) {
			next(err);
			res.status(400).json(err);
		}
	}

	async login(req: any, res: any, next: any) {
		try {
			const { email, password } = req.body;
			const userData = await userService.login(email, password);
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			console.log(res.cookie);
			return res.json(userData);
		} catch (err) {
			next(err);
		}
	}

	async logout(req: any, res: any, next: any) {
		try {
			const { refreshToken } = req.cookies;
			const token = await userService.logout(refreshToken);
			res.clearCookie('refreshToken');
			return res.json(token);
		} catch (err) {
			next(err);
		}
	}

	async refresh(req: any, res: any, next: any) {
		try {
			console.log('refresh ');
			const { refreshToken } = req.cookies;
			console.log(res.cookies);
			const userData = await userService.refresh(refreshToken);
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (err) {
			next(err);
		}
	}

	async getUsers(req: any, res: any, next: any) {
		try {
			const users = await userService.getAllUsers();
			return res.json(users);
		} catch (err) {
			next(err);
			res.status(400).json(err);
		}
	}
}

export default new authController();
