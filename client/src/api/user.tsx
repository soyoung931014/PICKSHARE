import api from './index';

const userApi = {
  login: (info: any) => {
    return api.post('/user/login', info);
  },
};
export default userApi;
