import { IInitial, IKakaoUser, IUser } from '../../../types/user';
import { ADD_USER_INFO } from '../../actions/actionTypes';
import { DELETE_USER_INFO } from '../../actions/actionTypes';

const initialState: IInitial = {
  isLogin: false,
  accessToken: '',
};
export interface IUserAction {
  type: string;
  isLogin: boolean;
  payload: IUser | IKakaoUser;
  accessToken: string;
}

const userReducer = (state = initialState, action: IUserAction) => {
  switch (action.type) {
    case ADD_USER_INFO:
      return {
        ...state,
        isLogin: action.isLogin,
        accessToken: action.accessToken,
        userInfo: { ...action.payload },
      };
    case DELETE_USER_INFO:
      return {
        ...state,
        isLogin: action.isLogin,
        accessToken: action.accessToken,
        userInfo: { ...action.payload },
      };

    default:
      return state;
  }
};
export default userReducer;
