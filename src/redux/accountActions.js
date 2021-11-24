import { LOGIN, LOGOUT } from './accountActionTypes';

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
