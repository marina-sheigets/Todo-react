import ApiError from '../exceptions/api-error';
import tokenService from '../services/tokenService';

export default function (req: any, res: any, next: any) {
	try {
		const autorizationHeader = req.headers.authorization;
		if (!autorizationHeader) {
			return next(ApiError.UnathorizedError());
		}
		const accessToken = autorizationHeader.split(' ')[1];
		if (!accessToken) {
			return res.status(401).json("User isn't authorized");
			//return next(ApiError.UnathorizedError());
		}

		const userData = tokenService.validateAccessToken(accessToken);
		if (!userData) {
			return res.status(401).json("User isn't authorized");
		}

		req.user = userData;
		next();
	} catch (err) {
		return next(ApiError.UnathorizedError());
	}
}
