import { Schema, model } from 'mongoose';

const TodoSchema: any = new Schema({
	id: {
		type: String,
		required: true,
		unique: true,
	},
	text: {
		type: String,
		required: true,
	},
	checked: {
		type: Boolean,
		required: true,
	},
	userID: {
		type: String,
		required: true,
	},
});

export default model('Todo', TodoSchema);
