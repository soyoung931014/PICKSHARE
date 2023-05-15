import { MODAL_ON, MODAL_OFF } from '../../actions/actionTypes';

export interface modalI {
  isModalOn: boolean;
}

const initialState: modalI = {
  isModalOn: false,
};

const modalReducer = (
  prevState = initialState,
  action: {
    type: string;
    isModalOn: boolean;
  }
): modalI => {
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
