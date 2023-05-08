export interface ITokenData {
  data: {
    data: { accessToken: string; loginMethod: number };
    message: string;
    statusCode: number;
  };
}
export interface ISignup {
  email: string;
  nickname: string;
  password: string;
}

export interface IUserData {
  data: {
    data: { userInfo: IUser };
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
export interface IKakaoData {
  data: {
    accessToken: string;
    data: IKakaoUser;
    message: string;
    statusCode: number;
  };
}
export interface IKakaoUser {
  email: string;
  loginMethod: number;
  nickname: string;
  statusMessage: string;
  userImage: string;
}
