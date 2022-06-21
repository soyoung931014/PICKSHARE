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
      ): Promise<Board[]> {
        return this.feedService.getAllFeed();
    }

    @Get('/mainfeed')
    getUserFeed(
        @Query('nickname') nickname: string,
    ): Promise<Board[]>{
        return this.feedService.getUserFeed(nickname);
    }

    @Get('/myfeed')
    @UseGuards(AuthGuard())
    getMyFeed(@GetUser() user: User): Promise<Board[]>{
        return this.feedService.getMyFeed(user);
    }

}
