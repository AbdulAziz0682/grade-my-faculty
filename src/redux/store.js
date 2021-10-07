import { createStore, combineReducers } from 'redux';

import account from './accountReducer';

const rootReducer = combineReducers({
  account,
});

const store = createStore(rootReducer);

export default store;
