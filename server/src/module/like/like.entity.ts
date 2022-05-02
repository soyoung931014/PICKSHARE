import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from '../board/board.entity';
import { User } from '../user/user.entity';

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.likes, { eager: false })
  user: User;

  @ManyToOne(() => Board, (board) => board.likes, { eager: false })
  board: Board;
}
