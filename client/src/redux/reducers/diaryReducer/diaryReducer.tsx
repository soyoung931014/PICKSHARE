import { DIARY_OFF, DIARY_ON } from '../../actions/actionTypes';

export interface diary {
  isDiaryOn: boolean;
}

const initialState: diary = {
  isDiaryOn: false,
};

const diaryReducer = (
  prevState = initialState,
  action: {
    type: string;
    isDiaryOn: boolean;
  }
): diary => {
  let state;
  switch (action.type) {
    case DIARY_ON:
      state = { ...prevState, isDiaryOn: true };
      break;
    case DIARY_OFF:
      state = { ...prevState, isDiaryOn: false };
      break;
    default:
      state = { ...prevState };
  }
  return state;
};

export default diaryReducer;
