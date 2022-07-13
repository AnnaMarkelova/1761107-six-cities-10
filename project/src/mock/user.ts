import { User } from '../types/user';

const user: User = {
  avatarUrl: 'img/1.png',
  email: 'Oliver.conner@gmail.com',
  id: 1,
  isPro: false,
  name: 'Oliver.conner',
  token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
};

export const getUser = () => user;
