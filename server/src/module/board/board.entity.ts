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
import { Heart } from '../heart/heart.entity';
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

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.boards, { eager: false })
  user: User;

  @OneToMany(() => Heart, (heart) => heart.board)
  hearts: Heart;

  @OneToMany(() => Comment, (comment) => comment.board)
  comments: Comment[];
}
