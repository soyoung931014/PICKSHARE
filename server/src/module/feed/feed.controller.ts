import { Controller } from '@nestjs/common';
import { Board } from '../board/board.entity';
import { GetBoard } from '../board/get-board.decorator';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
    //전체 피드 긁어오기
    //특정 유저의 피드 긁어오기(유저네임이 같은 피드 가져오기): Unlock
    //본인 피드의 경우 LOCK || UNLOCK 둘다 가져오기
    //유저 아이디
    // constructor(private feedService: FeedService){}
    // @Get('/feed')
    // getAllFeed(@GetBoard board: Board): Promise<Board[]> {
    //     return this.feedService.getAllFeed(board)
    // }
}
