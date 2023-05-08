import { ISignup } from '../types/user';
import api from './index';

const signupApi = {
  emailcheck: (email: string) => {
    return api.get(`user/emailcheck/${email}`);
  },
  nicknamecheck: (nickname: string) => {
    return api.get(`user/nicknamecheck/${nickname}`);
  },
  signup: (userInfo: ISignup) => {
    return api.post(`user/signup`, userInfo);
  },
};
export default signupApi;
