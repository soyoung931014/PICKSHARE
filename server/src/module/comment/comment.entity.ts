import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Board } from '../board/board.entity';
import { User } from '../user/user.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Board, (board) => board.comments)
  @JoinColumn({name: 'board_id' })
  board: Board;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({name: 'user_id' })
  user: User;
}
