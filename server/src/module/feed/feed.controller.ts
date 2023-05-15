import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Board } from '../board/board.entity';
import { GetUser } from '../token/get-user.decorator';
import { User } from '../user/user.entity';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
    constructor(private feedService: FeedService){}
    
    @Get()
    getAllFeed(
      @Query('start') start: number,
      @Query('end') end: number,
    ): Promise<Board[]> {
        return this.feedService.getAllFeed(start, end);
    }

    @Get('/mainfeed')
    getUserFeed(
      @Query('nickname') nickname: string,
      @Query('start') start: number,
      @Query('end') end: number,
    ): Promise<Board[]>{
        return this.feedService.getUserFeed(nickname, start, end);
    }

    @Get('/myfeed')
    @UseGuards(AuthGuard())
    getMyFeed(
      @GetUser() user: User,
      @Query('start') start: number,
      @Query('end') end: number,
    ): Promise<Board[]>{
      return this.feedService.getMyFeed(user, start, end);
    }

}
