// 토큰 뽑아오는 데이터
export interface ITokenData {
  data: {
    data: { accessToken: string; loginMethod: number };
    message: string;
    statusCode: number;
  };
}
// 회원가입
export interface ISignup {
  email: string;
  nickname: string;
  password: string;
}
// 유저정보데이터from 서버
export interface IUserData {
  data: {
    data: { userInfo: IUser };
    message: string;
    statusCode: number;
  };
}
export interface IMyPageData {
  data: IMyPage;
  message?: string;
  statusCode?: number;
}
export interface IKakaoData {
  data: {
    accessToken: string;
    data: IKakaoUser;
    message: string;
    statusCode: number;
  };
}
export interface IUser {
  id: number;
  email: string;
  nickname: string;
  userImage: string;
  loginMethod: number;
  statusMessage: string;
  created_at?: string;
  updated_at?: string;
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
export interface IKakaoUser {
  email: string;
  loginMethod: number;
  nickname: string;
  statusMessage: string;
  userImage: string;
}
export interface IInitial {
  isLogin: boolean;
  accessToken: string;
  userInfo?: IUser | IKakaoUser;
  refreshToken?: string;
}

export interface IUpdateUser {
  nickname: string;
  statusMessage: string;
  userImage: string;
}
