import { AxiosPromise } from 'axios';
import { FormValues } from '../pages/DiaryPage';
import api from './index';
import { Feedlist } from '../types/feedType';

const boardApi = {
  createBoard: (board: FormValues, accessToken: string) => {
    return api.post('/board', board, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  },

  getBoardById: (board_id: number): AxiosPromise<Feedlist> => {
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
  lockBoard: (
    board_id: number,
    lock: string,
    accessToken: string
  ): AxiosPromise<Feedlist> => {
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
