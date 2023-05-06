import { auth } from '../../../types/user';
import { ADD_USER_INFO } from '../../actions/actionTypes';
import { DELETE_USER_INFO } from '../../actions/actionTypes';

const initialState: auth = {
  isLogin: false,
  accessToken: '',
  userInfo: {},
};

const userReducer = (
  state = initialState,
  action: {
    type: string;
    payload: object;
    accessToken: string;
    isLogin: boolean;
  }
) => {
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
