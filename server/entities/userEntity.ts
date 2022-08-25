import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Todo } from './todoEntity';
import { Token } from './tokenEntity';

@Entity({ name: 'users' })
export class User {
	@PrimaryColumn({ type: 'bigint' })
	id: number;

	@Column({ unique: true })
	email: string;

	@Column()
	username: string;

	@Column()
	password: string;

	@OneToMany(() => Todo, (todo) => todo.user)
	todos: Todo[];

	@OneToMany(() => Token, (token) => token.user)
	tokens: Token[];
}
