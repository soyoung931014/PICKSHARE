export interface auth {
  isLogin: boolean;
  accessToken?: string;
  refreshToken?: string;
  userInfo?: userInfoProps;
}
export interface userInfoProps {
  id?: number;
  email?: string;
  nickname?: string;
  userImage?: string;
  loginMethod?: number;
  statusMessage?: string;
  created_at?: string;
  updated_at?: string;
}
