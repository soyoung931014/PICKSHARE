import api from './index';
//로그인과 토큰 검증 api, 카카오 회원가입 및 로그인

const loginApi = {
  login: (userInfo: object) => {
    return api.post(`user/login`, userInfo);
  },
  token: (token: string) => {
    return api.get(`token`, {
      headers: { authorization: `Bearer ${token}` },
    });
  },
  kakao: () => {
    return api.get(`user/kakao`, {
      headers: { authCode: window.location.search },
    });
  },
};

export default loginApi;
