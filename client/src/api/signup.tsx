import api from './index';

const signupApi = {
  emailcheck: (email: string) => {
    return api.get(`/user/emailcheck/${email}`);
  },
};
export default signupApi;
