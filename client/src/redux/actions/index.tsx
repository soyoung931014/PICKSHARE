/* eslint-disable @typescript-eslint/no-loss-of-precision */

//eslint-disable
// action 작성

import { ADD_USER_INFO } from './actionTypes';
import { DELETE_USER_INFO } from './actionTypes';
import { ADD_BOARD_INFO } from './actionTypes';
//user
// export const addUserInfo = (userInfo: object, token: string) => {
//   return {
//     type: ADD_USER_INFO,
//     payload: userInfo,
//     accessToken: token,
//   };
// };
export const addUserInfo = (userInfo: object, token: string) => {
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
export const addBoardInfo = (boardInfo: object, token: string) => {
  return {
    type: ADD_BOARD_INFO,
    payload: boardInfo,
    accessToken: token,
  };
};
