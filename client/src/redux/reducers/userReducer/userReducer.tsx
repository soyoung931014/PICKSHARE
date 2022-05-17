// import { any } from 'sequelize/types/lib/operators';
import { ADD_USER_INFO } from '../../actions/actionTypes';

export interface auth {
  isLogin: boolean;
  accessToken?: string;
  refreshToken?: string;
  userInfo: {
    id?: number;
    email?: string;
    nickname?: string;
    userImage?: string;
    loginMethod?: number;
    statusMessage?: string;
    created_at?: string;
    updated_at?: string;
  };
}

const initialState: auth = {
  isLogin: false,
  accessToken: '',
  userInfo: {},
};
const userReducer = (
  state = initialState,
  action: { type: string; payload: object; accessToken: string }
) => {
  switch (action.type) {
    case ADD_USER_INFO:
      return {
        ...state,
        isLogin: true,
        accessToken: action.accessToken,
        userInfo: { ...action.payload },
      };
    default:
      return state;
  }
};
export default userReducer;
