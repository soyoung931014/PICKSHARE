import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Follow extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  followingNickname: string;

  @ManyToOne(() => User, (user) => user.follows)
  @JoinColumn({name: 'user_id'})
  user: User;
}
