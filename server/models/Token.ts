import { model, Schema } from 'mongoose';

const Token = new Schema({
	refreshToken: { type: String, required: true },
	user: { type: String, required: true },
});

export default model('Token', Token);
