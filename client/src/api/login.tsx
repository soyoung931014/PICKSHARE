import api from './index';
//로그인과 토큰 검증 api

const loginApi = {
  login: (userInfo: object) => {
    return api.post(`user/login`, userInfo);
  },
  token: (token: string) => {
    return api.get(`token`, {
      headers: { authorization: `Bearer ${token}` },
    });
  },
};

export default loginApi;
