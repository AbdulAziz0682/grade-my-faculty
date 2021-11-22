import { LOGIN } from './accountActionTypes';

const initialState = {
  loggedIn: false,
};

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN: return {
      ...state,
      loggedIn: true,
      user: action.payload.user,
    };
    default: return state;
  }
}

export default accountReducer;
