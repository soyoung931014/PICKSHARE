// action 작성

import { IKakaoUser, IUser } from '../../types/user';
import {
  ADD_USER_INFO,
  DELETE_USER_INFO,
  ADD_BOARD_INFO,
  DELETE_BOARD_INFO,
  MODAL_OFF,
  MODAL_ON,
  DIARY_ON,
  DIARY_OFF,
  EDIT_MODE_ON,
  EDIT_MODE_OFF,
} from './actionTypes';

export const addUserInfo = (userInfo: IUser | IKakaoUser, token: string) => {
  return {
    type: ADD_USER_INFO,
    isLogin: true,
    payload: userInfo,
    accessToken: token,
  };
};

export const deleteUserInfo = () => {
  return {
    type: DELETE_USER_INFO,
    isLogin: false,
    payload: {},
    accessToken: '',
  };
};

// board
export const addBoardInfo = (boardInfo: object) => {
  return {
    type: ADD_BOARD_INFO,
    boardInfo: boardInfo,
  };
};

export const deleteBoardInfo = () => {
  return {
    type: DELETE_BOARD_INFO,
    boardInfo: {},
  };
};

export const modalOnAction = {
  type: MODAL_ON,
};

export const modalOffAction = {
  type: MODAL_OFF,
};

export const diaryOnAction = {
  type: DIARY_ON,
};

export const diaryOffAction = {
  type: DIARY_OFF,
};

export const editOnAction = {
  type: EDIT_MODE_ON,
};

export const editOffAction = {
  type: EDIT_MODE_OFF,
};
