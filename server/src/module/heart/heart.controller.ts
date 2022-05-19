import { Body, Controller, Delete, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../token/get-user.decorator';
import { User } from '../user/user.entity';
import { Heart } from './heart.entity';
import { HeartService } from './heart.service';
import { HeartStatusPipe } from './pipes/heart-validation.pip';

@Controller('heart')
export class HeartController {
	constructor( private heartService: HeartService ) {}
	
	@Post()
	@UseGuards(AuthGuard())
	postHeart(@GetUser() user: User, @Body('board_id', HeartStatusPipe) board_id: number): Promise<Heart[]>{
		return this.heartService.postHeart(user, board_id);
	}

	@Delete()
	@UseGuards(AuthGuard())
	cancelHeart(@GetUser() user: User, @Body('board_id', HeartStatusPipe) board_id: number): Promise<Heart[]>{
		return this.heartService.cancelHeart(user, board_id);
	}

	@Get()
	getHeart(@Query('board_id', HeartStatusPipe) board_id: number): Promise<number>{
		return this.heartService.getHeart(board_id);
	}
}
