import { createStore, combineReducers } from 'redux';

import account from './accountReducer';
import faculty from './facultyReducer';

const rootReducer = combineReducers({
  account,
  faculty,
});

const store = createStore(rootReducer);

export default store;
