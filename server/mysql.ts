import { DataSource } from 'typeorm';
import { Todo } from './entities/todoEntity';
import { Token } from './entities/tokenEntity';
import { User } from './entities/userEntity';
import 'dotenv/config';

export const db = new DataSource({
	type: 'mysql',
	host: process.env.DB_HOST,
	port: 3306, //default
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	synchronize: true,
	entities: [User, Todo, Token],
});
