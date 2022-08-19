import userService from '../services/userService';
import { validationResult } from 'express-validator';
import ApiError from '../exceptions/api-error';
import { Request, Response } from 'express';
import dayjs from 'dayjs';
import { REFRESH_TOKEN } from '../constants';

class AuthController {
	async registration(req: Request, res: Response, next: any) {
		try {
			const errors: any = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Validation error', errors.array()));
			}
			const { email, username, password } = req.body;
			const userData = await userService.registration(email, username, password);
			res.cookie(REFRESH_TOKEN, userData.refreshToken, {
				expires: dayjs().add(30, 'days').toDate(),
				httpOnly: true,
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
			res.cookie(REFRESH_TOKEN, userData.refreshToken, {
				expires: dayjs().add(30, 'days').toDate(),
				httpOnly: true,
			});
			return res.json(userData);
		} catch (err) {
			next(err);
		}
	}

	async logout(req: any, res: any, next: any) {
		try {
			const { refreshToken } = req.cookies;
			const token = await userService.logout(refreshToken);
			localStorage.removeItem('token');
			return res.json(token);
		} catch (err) {
			next(err);
		}
	}

	async refresh(req: Request, res: Response, next: any) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await userService.refresh(refreshToken);
			res.cookie(REFRESH_TOKEN, userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: false,
			});

			return res.json(userData);
		} catch (err) {
			next(err);
		}
	}
}

export default new AuthController();
