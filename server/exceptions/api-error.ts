export default class ApiError extends Error {
	status: number;
	errors: any;

	constructor(status: number, message: string, errors = []) {
		super(message);
		this.status = status;
		this.errors = errors;
	}

	static UnathorizedError() {
		return new ApiError(401, 'User is not authorized');
	}

	static BadRequest(message: string, errors = []) {
		return new ApiError(400, message, errors);
	}
}
