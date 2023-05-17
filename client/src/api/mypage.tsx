import api from './index';
//로그인과 토큰 검증 api

const mypageApi = {
  patch: (
    nickname: string,
    statusMessage: string,
    userImage: string,
    accessToken: string
  ) => {
    return api.patch(
      `mypage/update`,
      { nickname, statusMessage, userImage },
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    );
  },
  userRemove: (passwordCheck: string, accessToken: string) => {
    return api.delete(`mypage/withdrawl`, {
      data: { password: passwordCheck },
      headers: { authorization: `Bearer ${accessToken}` },
    });
  },
  userRemoveKakao: (accessToken: string) => {
    return api.delete(`mypage/withdrawl/kakao`, {
      headers: { authorization: `Bearer ${accessToken}` },
    });
  },
};

export default mypageApi;
