import { RENDER } from '../../actions/actionTypes';

export interface renderI {
  isRender: boolean;
}

const initialState: renderI = {
  isRender: false,
};

const renderReducer = (
  prevState = initialState,
  action: {
    type: string;
    isRender: boolean;
  }
): renderI => {
  let state;
  switch (action.type) {
    case RENDER:
      state = { isRender: !prevState.isRender };
      break;
    default:
      state = { ...prevState };
  }
  return state;
};

export default renderReducer;
