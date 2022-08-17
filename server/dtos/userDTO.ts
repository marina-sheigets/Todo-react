export default class UserDTO {
	email: string;
	username: string;
	id: number;

	constructor(model: any) {
		this.email = model.email;
		this.username = model.username;
		this.id = model._id;
	}
}
