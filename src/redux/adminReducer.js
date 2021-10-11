import { SET_CURRENT_TAB } from './adminActionTypes';

const initialState = {
  currentTab: 'users',
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_TAB: return {
      ...state,
      currentTab: action.payload.tab,
    };
    default: return state;
  }
}
