import { ADD_USER, SET_CURRENT_TAB } from './adminActionTypes';

export function setCurrentTab(tab) {
  return {
    type: SET_CURRENT_TAB,
    payload: {
      tab,
    },
  };
}

export function addUser(user) {
  return {
    type: ADD_USER,
    payload: {
      user,
    },
  };
}
