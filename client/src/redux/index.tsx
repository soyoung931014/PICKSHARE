// comobineReducers: 리듀서가 2개 이상일 경우 combineReducer메소드에 객체형식으로
// reducer를 넣는다.
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './reducers/userReducer/userReducer';

const rootReducer = combineReducers({
  userInfo: userReducer,
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userInfo'],
};

export default persistReducer(persistConfig, rootReducer);
