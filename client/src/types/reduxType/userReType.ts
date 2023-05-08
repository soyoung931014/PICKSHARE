import { IKakaoUser, IUser } from '../userType';

export interface IInitialUser {
  isLogin: boolean;
  accessToken: string;
  userInfo?: IUser | IKakaoUser;
  refreshToken?: string;
}

export interface IUserAction {
  type: string;
  isLogin: boolean;
  payload: IUser | IKakaoUser;
  accessToken: string;
}
