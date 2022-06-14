import { FormValues } from '../pages/DiaryPage';
import api from './index';

const boardApi = {
  createBoard: (board: FormValues, accessToken: string) => {
    return api.post('/board', board, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  },
  //사진으로 보드 정보 가져오기
  findBoardByPic: (pictureInfo: string) => {
    return api.get(`/board?picture=${pictureInfo}`);
  },
};

export default boardApi;
