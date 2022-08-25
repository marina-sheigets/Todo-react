import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './userEntity';

@Entity()
export class Token {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	refreshToken: string;

	@ManyToOne((type) => User, (user) => user)
	@JoinColumn({ name: 'userId' })
	public user: User;

	@Column()
	public userId: number;
}
