import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
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

export default TodoSchema;
