import { createStore, combineReducers } from 'redux';

import toasts from './toastsReducer';
import account from './accountReducer';
import faculty from './facultyReducer';
import admin from './adminReducer';

const rootReducer = combineReducers({
  account,
  faculty,
  admin,
  toasts,
});

const store = createStore(rootReducer);

export default store;
