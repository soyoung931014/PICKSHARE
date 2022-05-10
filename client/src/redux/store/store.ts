import { createStore, applyMiddleware } from 'redux';

import rootReducer from '..';
import logger from 'redux-logger';

const middleware = [logger];
const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
