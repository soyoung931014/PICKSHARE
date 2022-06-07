import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "../board/board.entity";
import { User } from "../user/user.entity";

@Entity()
export class Heart extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    user_id: number;

    @Column()
    board_id: number;

    @ManyToOne(() => User, (user) => user.hearts)
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(() => Board, (board) => board.hearts)
    @JoinColumn({name: 'board_id'})
    board: Board;
}