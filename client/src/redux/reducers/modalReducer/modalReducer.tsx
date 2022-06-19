import { MODAL_ON, MODAL_OFF } from '../../actions/actionTypes';

export interface modal {
  isModalOn: boolean;
}

const initialState: modal = {
  isModalOn: false,
};

const modalReducer = (
  prevState = initialState,
  action: {
    type: string;
    isModalOn: boolean;
  }
): modal => {
  let state;
  switch (action.type) {
    case MODAL_ON:
      state = { ...prevState, isModalOn: true };
      break;
    case MODAL_OFF:
      state = { ...prevState, isModalOn: false };
      break;
    default:
      state = { ...prevState };
  }
  return state;
};

export default modalReducer;
