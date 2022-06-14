import { EDIT_MODE_ON, EDIT_MODE_OFF } from '../../actions/actionTypes';

export interface edit {
  isEditOn: boolean;
}

const initialState: edit = {
  isEditOn: false,
};

const editReducer = (
  prevState = initialState,
  action: {
    type: string;
    isEditOn: boolean;
  }
): edit => {
  let state;
  switch (action.type) {
    case EDIT_MODE_ON:
      state = { ...prevState, isEditOn: true };
      break;
    case EDIT_MODE_OFF:
      state = { ...prevState, isEditOn: false };
      break;
    default:
      state = { ...prevState };
  }
  return state;
};

export default editReducer;
