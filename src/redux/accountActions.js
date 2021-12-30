import { LOGIN, LOGOUT, SET_USER } from './accountActionTypes';

export function login(data) {
  return {
    type: LOGIN,
    payload: {
      ...data,
    },
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user,
  };
}
