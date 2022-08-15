import { Schema, model } from 'mongoose';

const TodoSchema: any = new Schema({
	id: {
		type: Number,
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
});

export default model('Todo', TodoSchema);
