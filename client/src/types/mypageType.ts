import { IUser } from './userType';

export interface IMyPageData {
  data: IMyPage;
  message?: string;
  statusCode?: number;
}
export interface IMyPage extends IUser {
  data: {
    id: any;
    email: any;
    loginMethod: any;
    nickname: any;
    statusMessage: any;
    userImage: any;
  };
  currentHashedRefreshToken: null;
  password: null;
}
