import { model, Schema } from 'mongoose';

const User = new Schema({
	email: { type: String, unique: true, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
});

export default model('User', User);
