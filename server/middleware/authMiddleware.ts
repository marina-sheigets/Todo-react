import ApiError from '../exceptions/api-error';
import tokenService from '../services/tokenService';

export default function (req: any, res: any, next: any) {
	try {
		const autorizationHeader = req.headers.authorization;
		console.log(req.headers);
		if (!autorizationHeader) {
			return next(ApiError.UnathorizedError());
		}
		const accessToken = autorizationHeader.split(' ')[1];
		console.log(accessToken);
		if (!accessToken) {
			return next(ApiError.UnathorizedError());
		}

		const userData = tokenService.validateAccessToken(accessToken);
		if (!userData) {
			return next(ApiError.UnathorizedError());
		}

		req.user = userData;
		next();
	} catch (err) {
		return next(ApiError.UnathorizedError());
	}
}
