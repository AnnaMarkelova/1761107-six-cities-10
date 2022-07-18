import { Comment } from '../types/comment';

const comments: Comment[] = [
  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: 'Wed Jul 13 2022 19:24:55 GMT+0200 (CEST)',
    id: 1,
    rating: 4,
    user: {
      avatarUrl: 'img/1.png',
      id: 1,
      isPro: false,
      name: 'Oliver.conner'
    }
  },
  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: 'Wed Jul 13 2022 19:24:55 GMT+0200 (CEST)',
    id: 2,
    rating: 4,
    user: {
      avatarUrl: 'img/1.png',
      id: 2,
      isPro: false,
      name: 'Oliver.conner'
    }
  }
];

export const getComments = () => comments;
