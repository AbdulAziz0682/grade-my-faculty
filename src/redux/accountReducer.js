import {
  LOGIN,
  LOGOUT,
  SET_USER,
} from './accountActionTypes';

const initialState = {
  loggedIn: false,
  role: '',
};

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN: return {
      loggedIn: true,
      user: action.payload.role === 'user' ? action.payload.user : null,
      admin: action.payload.role === 'admin' ? action.payload.admin : null,
      role: action.payload.role,
    };
    case LOGOUT: return {
      loggedIn: false,
      role: '',
    };
    case SET_USER: return {
      ...state,
      user: action.payload,
    };
    default: return state;
  }
}

export default accountReducer;
