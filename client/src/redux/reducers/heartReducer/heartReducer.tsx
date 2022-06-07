import { HEART_OFF, HEART_ON } from '../../actions/actionTypes';

interface Heart {
  isHeartOn: boolean;
}

const initialState: Heart = {
  isHeartOn: false,
};

const heartReducer = (
  prevState = initialState,
  action: {
    type: string;
    isHeartOn: boolean;
  }
): Heart => {
  let state: Heart;
  switch (action.type) {
    case HEART_ON:
      state = { ...prevState, isHeartOn: true };
      break;
    case HEART_OFF:
      state = { ...prevState, isHeartOn: false };
      break;
    default:
      state = { ...prevState };
  }
  return state;
};

export default heartReducer;
