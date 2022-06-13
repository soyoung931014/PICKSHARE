import { FOLLOW_USER, UNFOLLOW_USER } from '../../actions/actionTypes';

export interface follow {
  isFollow: boolean;
}

const initialState = {
  isFollow: false,
};

const followReducer = (
  prevState = initialState,
  action: {
    type: string;
    isFollow: boolean;
  }
) => {
  let state;
  switch (action.type) {
    case FOLLOW_USER:
      state = { ...prevState, isFollow: true };
      break;
    case UNFOLLOW_USER:
      state = { ...prevState, isFollow: false };
      break;
    default:
      state = { ...prevState };
  }
  return state;
};

export default followReducer;
