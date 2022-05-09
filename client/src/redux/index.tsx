// comobineReducers: 리듀서가 2개 이상일 경우 combineReducer메소드에 객체형식으로
// reducer를 넣는다.
import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer/userReducer';

const rootReducer = combineReducers({
  userInfo: userReducer,
});

export default rootReducer;
