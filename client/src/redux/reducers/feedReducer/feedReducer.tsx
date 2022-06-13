import { FINISH_USER_FEED, SEARCH_USER_FEED } from '../../actions/actionTypes';

export interface feed {
  searchNickname: string;
}

const initialState: feed = {
  searchNickname: '',
};

const searchNickReducer = (
  prevState = initialState,
  action: {
    type: string;
    searchNickname: string;
  }
) => {
  let state;
  switch (action.type) {
    case SEARCH_USER_FEED:
      state = { ...prevState, searchNickname: action.searchNickname };
      break;
    case FINISH_USER_FEED:
      state = { ...prevState, searchNickname: '' };
      break;
    default:
      state = { ...prevState };
  }
  return state;
};

export default searchNickReducer;
