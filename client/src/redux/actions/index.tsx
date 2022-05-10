/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// action 작성

import { ADD_USER_INFO } from './actionTypes';

//user
export const addUserInfo = (userInfo: any) => {
  return {
    type: ADD_USER_INFO,
    payload: userInfo,
  };
};
