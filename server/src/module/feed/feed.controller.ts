import { Controller, Get, Query } from '@nestjs/common';
import { Board } from '../board/board.entity';
// import { GetBoard } from '../board/get-board.decorator';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
    //본인 피드의 경우 LOCK || UNLOCK 둘다 가져오기
    //유저 아이디
    constructor(private feedService: FeedService){}
    
    //전체 피드 긁어오기(UNLOCK만 가져와야함)
    //페이지네이션(limit=6)
    @Get('mainfeed')
    getAllFeed(
        // @Query('pageStart') pageStart: number,
        //@Query('pageSize') pageSize: number
      ): Promise<Board[]> {
        return this.feedService.getAllFeed()
    }
    
    //특정 유저의 피드 긁어오기(유저네임이 같은 피드 가져오기): Unlock
    //@Query(key?: string)	req.query / req.query[key]
    //깃북 localhost:5000/feed/userfeed?user_id=${user_id}로 변경필요
    @Get()
    getUserFeed(@Query('user_id') user_id: Board): Promise<Board[]>{
        return this.feedService.getUserFeed(user_id)
    }

    //깃북 /feed?post_id=${post_id} 부분은 보드 부분에 있어서 생략(깃북 수정필요)
}
