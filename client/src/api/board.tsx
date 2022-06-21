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
  // findBoardByPic: (pictureInfo: string) => {
  //   return api.get(`/board?picture=${pictureInfo}`);
  // },
  getBoardById: (board_id: number) => {
    return api.get(`/board/${board_id}`);
  },
  editBoard: (board_id: number, board: FormValues, accessToken: string) => {
    return api.patch(`/board/${board_id}/edit`, board, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  },
  deleteBoard: (board_id: number, accessToken: string) => {
    return api.delete(`/board/${board_id}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  },
  lockBoard: (board_id: number, lock: string, accessToken: string) => {
    return api.patch(
      `/board/${board_id}/lock`,
      {
        lock: lock,
      },
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },
};

export default boardApi;
