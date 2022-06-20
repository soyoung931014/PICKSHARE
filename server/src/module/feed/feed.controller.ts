import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Board } from '../board/board.entity';
import { GetUser } from '../token/get-user.decorator';
import { User } from '../user/user.entity';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
    //본인 피드의 경우 LOCK || UNLOCK 둘다 가져오기
    //유저 아이디
    constructor(private feedService: FeedService){}
    
    //전체 피드 긁어오기(UNLOCK만 가져와야함)
    //페이지네이션(limit=6)
    @Get()
    getAllFeed(
        // @Query('pageStart') pageStart: number,
        //@Query('pageSize') pageSize: number
      ): Promise<Board[]> {
        return this.feedService.getAllFeed();
    }
    
    //특정 유저의 피드 긁어오기(유저네임이 같은 피드 가져오기): Unlock
    //@Query(key?: string)	req.query / req.query[key]
    //깃북 localhost:5000/feed/userfeed?user_id=${user_id}로 변경필요
    @Get('/mainfeed')
    getUserFeed(
        @Query('nickname') nickname: string,
    ): Promise<Board[]>{
        return this.feedService.getUserFeed(nickname);
    }

    //깃북 /feed?post_id=${post_id} 부분은 보드 부분에 있어서 생략(깃북 수정필요)
    //본인 아이디 검색시 클라이언트에서 본인 아이디인경우
    //getMyFeed()로 넘김
    @Get('/myfeed')
    @UseGuards(AuthGuard())
    getMyFeed(@GetUser() user: User): Promise<Board[]>{
        return this.feedService.getMyFeed(user);
    }

    // @Get('/myfeed/date')
    // @UseGuards(AuthGuard())
    // searchMineByDate( 
    //     @GetUser() user: User,
    //     @Query('date') date: string
    // ): Promise<Board[]> {
    //     return this.feedService.searchMineByDate(user, date);
    // }

    @Get('/user/date')
    searchUsersByDate( 
        @Query('nickname') nickname: string,
        @Query('date') date: string
    ): Promise<Board[]> {
        return this.feedService.searchUsersByDate(nickname, date);
    }

    // @Get('/user/info')
    // searchUserInfo(
    //     @Query('nickname') nickname: string
    // ): Promise<any> {
    //     return this.feedService.searchUserInfo(nickname)
    // }
}
