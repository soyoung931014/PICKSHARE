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
      @Query('page') page: number
      ): Promise<Board[]> {
        return this.feedService.getAllFeed(page);
    }

    @Get('/mainfeed')
    getUserFeed(
      @Query('nickname') nickname: string,
      @Query('page') page: number,
    ): Promise<Board[]>{
        return this.feedService.getUserFeed(nickname, page);
    }

    @Get('/myfeed')
    @UseGuards(AuthGuard())
    getMyFeed(@GetUser() user: User): Promise<Board[]>{
        return this.feedService.getMyFeed(user);
    }

}
