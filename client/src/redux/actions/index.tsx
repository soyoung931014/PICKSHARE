/* eslint-disable @typescript-eslint/no-loss-of-precision */

//eslint-disable
// action 작성

import {
  ADD_USER_INFO,
  DELETE_USER_INFO,
  FINISH_USER_FEED,
  FOLLOW_USER,
  ADD_BOARD_INFO,
  MODAL_OFF,
  MODAL_ON,
  SEARCH_USER_FEED,
  UNFOLLOW_USER,
  HEART_ON,
  HEART_OFF,
} from './actionTypes';

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

//modal
export const modalOnAcrion = {
  type: MODAL_ON,
};

export const modalOffAction = {
  type: MODAL_OFF,
};

//follow
export const followAction = {
  type: FOLLOW_USER,
};

export const unfollowAction = {
  type: UNFOLLOW_USER,
};

//heart
export const heartOnAction = {
  type: HEART_ON,
};

export const heartOffAction = {
  type: HEART_OFF,
};

//feed
export const searchUserFeed = (data: string) => {
  return {
    type: SEARCH_USER_FEED,
    payload: data,
  };
};

export const finishUserFeed = () => {
  return {
    type: FINISH_USER_FEED,
    payload: '',
  };
};
