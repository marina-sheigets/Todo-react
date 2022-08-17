import { model, Schema } from 'mongoose';
import { ROLES } from '../constants';

const Role = new Schema({
	value: { type: String, unique: true, required: true, default: ROLES.user },
});

export default model('Role', Role);
