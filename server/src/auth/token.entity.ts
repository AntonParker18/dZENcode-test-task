import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.tokens)
  user: User;

  @Column({ type: 'text' })
  token: string;

  @Column({ type: 'timestamp' })
  expiration: Date;
}