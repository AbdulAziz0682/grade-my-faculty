import { createState } from '@hookstate/core';

const account = createState({
  role: 'user',
  person: {
    email: 'example@gamil.com',
  },
});

export default account;
