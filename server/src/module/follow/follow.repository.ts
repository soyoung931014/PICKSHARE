import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { User } from "../user/user.entity";
import { Follow } from "./follow.entity";

@EntityRepository(Follow)
export class FollowRepository extends Repository<Follow> {
    async postFollowing(user: User, nickname: string): Promise<Follow[]> {
        const findAlreadyExist = await this.find({
            'user_id': user.id,
            'followingNickname': nickname
        })

        if(findAlreadyExist.length !== 0){
            throw new NotFoundException(`Already followed ${nickname}`);
        }
        const following = {
            'user_id': user.id,
            'followingNickname': nickname
        };

        await this.save(following);
        
        //사용자가 팔로우한 닉네임 목록
        const nicknameFollowNum =  this.find({
            where: {
                'followingNickname': nickname
            }
        })

        return nicknameFollowNum;
    }
}