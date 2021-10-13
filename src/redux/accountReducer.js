import { LOGIN } from './accountActionTypes';

const initialState = {
  loggedIn: false,
  role: 'user',
  person: {
    email: 'example@gmail.com',
  },
};

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN: return {
      ...state,
      loggedIn: true,
      role: action.payload.user.role,
      person: action.payload.user.person,
    };
    default: return state;
  }
}

export default accountReducer;
