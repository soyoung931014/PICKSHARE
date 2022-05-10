import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Follow } from './follow.entity';
import { FollowRepository } from './follow.repository';

@Injectable()
export class FollowService {
  constructor(
		@InjectRepository(FollowRepository)
		private followRepository: FollowRepository,
	) {}

	postFollowing(user: User, followingNickname: string): Promise<Follow[]> {
		return this.followRepository.postFollowing(user, followingNickname);
	}

	getFollowingList(followingNickname: string): Promise<Follow[]>{
		const nicknameFollowList = this.followRepository.find({
			where:{
				'followingNickname': followingNickname
			}
		})

		return nicknameFollowList;
	}

	async cancelFollowing(user: User, followingNickname: string): Promise<void> {
		const result = await this.followRepository.delete({user, followingNickname});

		if(result.affected === 0) {
			throw new NotFoundException(`Can't find Following with nickname ${followingNickname}`);
		}
	}

	async getFollowerList(followingNickname: string): Promise<Follow[]> {
		const nickFollowerList = this.followRepository.find({
			where: {
				followingNickname
			}
		})

		return nickFollowerList;
	}
}
