/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ADD_USER_INFO } from '../../actions/actionTypes';

const initialState = {
  email: '',
};
const userReducer = (
  state = initialState,
  action: { type: string; payload: object }
) => {
  switch (action.type) {
    case ADD_USER_INFO:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
