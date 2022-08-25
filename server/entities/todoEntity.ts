import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './userEntity';

@Entity()
export class Todo {
	@PrimaryColumn({ type: 'bigint' })
	id: number;

	@Column()
	text: string;

	@Column({ default: false })
	checked: boolean;

	@ManyToOne((type) => User, (user) => user)
	@JoinColumn({ name: 'userId' })
	public user: User;

	@Column()
	public userId: number;
}
