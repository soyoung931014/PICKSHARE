import { IInitialUser, IUserAction } from '../../../types/reduxType/userReType';
import { ADD_USER_INFO } from '../../actions/actionTypes';
import { DELETE_USER_INFO } from '../../actions/actionTypes';

const initialState: IInitialUser = {
  isLogin: false,
  accessToken: '',
};

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
