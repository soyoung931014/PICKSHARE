export interface commentDataArr {
  data: {
    data: comInfoData[];
    statusMessage?: string;
  };
}
export interface comInfoData {
  comment: commentInfo;
  userInfo: info;
}
export interface commentInfo {
  id: number;
  text: string;
  updated_at: string;
  created_at: string;
}

export interface info {
  email: string;
  nickname: string;
  userImage: string;
}
