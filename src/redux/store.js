import { createStore, combineReducers } from 'redux';

import account from './accountReducer';
import faculty from './facultyReducer';
import admin from './adminReducer';

const rootReducer = combineReducers({
  account,
  faculty,
  admin,
});

const store = createStore(rootReducer);

export default store;
