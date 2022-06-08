/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// comobineReducers: 리듀서가 2개 이상일 경우 combineReducer메소드에 객체형식으로
// reducer를 넣는다.
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './reducers/userReducer/userReducer';
import boardReducer from './reducers/boardReducer';
import followReducer from './reducers/follow/followReducer';
import modalReducer from './reducers/modalReducer/modalReducer';
import heartReducer from './reducers/heartReducer/heartReducer';

const rootReducer = combineReducers({
  userInfo: userReducer,
  boardInfo: boardReducer,
  followInfo: followReducer,
  heartReducer,
  modalInfo: modalReducer,
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userInfo'],
};

export default persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
