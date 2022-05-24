import { EntityRepository, Repository } from "typeorm";
import { User } from "../user/user.entity";
import { Follow } from "./follow.entity";

@EntityRepository(Follow)
export class FollowRepository extends Repository<Follow> {
    async postFollowing(user: User, nickname: string): Promise<Follow[]> {
        const following = {
            'user_id': user.id,
            'followingNickname': nickname
        };

        await this.save(following);
        
        //nickname을 팔로우한 사람
        const nicknameFollowNum =  this.find({
            where: {
                // 'followingNickname': nickname
                "user_id": user.id
            }
        })

        return nicknameFollowNum;
    }
}