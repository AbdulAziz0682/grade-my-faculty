import { SET_CURRENT_TAB } from './adminActionTypes';

const initialState = {
  currentTab: { name: 'users', data: null },
  users: [
    {
      id: 1,
      name: 'u1',
      email: 'u1@email.com',
      register: '5 min ago',
    },
    {
      id: 2,
      name: 'u2',
      email: 'u2@email.com',
      register: '50 min ago',
    },
    {
      id: 3,
      name: 'u3',
      email: 'u3@email.com',
      register: '1 hr ago',
    },
  ],
  professors: [
    {
      id: 1,
      name: 'u1',
      email: 'u1@email.com',
      university: 'North South University',
    },
    {
      id: 2,
      name: 'u2',
      email: 'u2@email.com',
      university: 'North South University',
    },
    {
      id: 3,
      name: 'u3',
      email: 'u3@email.com',
      university: 'North South University',
    },
  ],
  institutes: [
    {
      id: 1,
      name: 'u1',
      email: 'u1@email.com',
      register: '5 min ago',
    },
    {
      id: 2,
      name: 'u2',
      email: 'u2@email.com',
      register: '50 min ago',
    },
    {
      id: 3,
      name: 'u3',
      email: 'u3@email.com',
      register: '1 hr ago',
    },
  ],
  blogs: [
    {
      id: 1,
      title: 'This is blog post title',
      register: '5 min ago',
    },
    {
      id: 2,
      title: 'This is blog post title',
      email: 'u2@email.com',
      register: '50 min ago',
    },
    {
      id: 3,
      title: 'This is blog post title',
      register: '1 hr ago',
    },
  ],
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
