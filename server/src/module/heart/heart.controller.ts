import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../token/get-user.decorator';
import { User } from '../user/user.entity';
import { HeartService } from './heart.service';
import { HeartStatusPipe } from './pipes/heart-validation.pip';

@Controller('heart')
@UseGuards(AuthGuard())
export class HeartController {
	constructor( private heartService: HeartService ) {}

	@Post()
	postHeart(@GetUser() user: User, @Body('board_id', HeartStatusPipe) board_id: number): Promise<void>{
		console.log(user,'user-HeartController');
		console.log(board_id, 'board-HeartController');
		return this.heartService.postHeart(user, board_id)
	}

	// @Delete()
	// cancelHeart(@Body())
}
