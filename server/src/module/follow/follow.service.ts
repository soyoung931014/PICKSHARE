import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { Follow } from './follow.entity';
import { FollowRepository } from './follow.repository';

@Injectable()
export class FollowService {
  constructor(
		@InjectRepository(FollowRepository)
		private followRepository: FollowRepository,
		private userRepository: UserRepository
	) {}

	async postFollowing(user: User, followingNickname: string): Promise<Follow[]> {
		const findUser = await this.userRepository.find({
            where: {
                nickname: followingNickname
            }
        })
		if(user.id === findUser[0].id){
			throw new BadRequestException(`Can not follow userself ${followingNickname}`)
		}
		return this.followRepository.postFollowing(user, followingNickname);
	}

	async getFollowingList(nickname: string): Promise<Follow[]>{
		//user_id가 user.id인 리스트
		//user_id로 유저 테이블에서 유저 닉네임을 가져와야함.
		const findUser = await this.userRepository.find({
			where: {
				nickname
			}
		})

		const followingList = await this.followRepository.createQueryBuilder('follow')
			.select([
				'follow.id AS id',
				'follow.followingNickname AS followingNickname',
				'user.nickname AS followerNickname'
			])
			.leftJoin(
				'follow.user', 'user'
			)
			.where('follow.user_id = :user_id', {user_id: `${findUser[0].id}`})
			.groupBy('follow.id')
			.getRawMany()

		return followingList;

	}

	async cancelFollowing(user: User, followingNickname: string): Promise<void> {
		const result = await this.followRepository.delete({user, followingNickname});

		if(result.affected === 0) {
			throw new NotFoundException(`Can't find Following with nickname ${followingNickname}`);
		}
	}

	async getFollowerList(nickname: string): Promise<Follow[]> {
		//user_id에 따른 nickname을 넣어야함
		const followerList = await this.followRepository.createQueryBuilder('follow')
		.select([
			'follow.id AS id',
			'follow.followingNickname AS user_id',
			'user.nickname AS followerNickname'
		])
		.leftJoin(
			'follow.user', 'user'
		)
		.where('follow.followingNickname = :followingNickname', {followingNickname: `${nickname}`})
		.groupBy('follow.id')
		.getRawMany()

		return followerList
	}

	async getFollowOrNot(user: User, userNickname: string): Promise<boolean> {
		const FindExistOrNot = await this.followRepository.find({
			where: {
				user_id: user.id,
				followingNickname: userNickname
			}
		})

		if(FindExistOrNot.length !== 0) {
			//팔로우 중
			return true;
		}
		return false;
	}
}
