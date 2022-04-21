import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from '../comment/comment.entity';
import { Like } from '../like/like.entity';
import { User } from '../user/user.entity';
import { Lock, Mood, PictureMethod } from './board-state.union';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  picture: string;

  @Column()
  pictureMethod: PictureMethod;

  @Column()
  mood: Mood;

  @Column()
  lock: Lock;

  @Column()
  content: string;

  @Column()
  date: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.boards)
  user: User;

  @OneToMany(() => Like, (like) => like.board)
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.board)
  comments: Comment[];
}
