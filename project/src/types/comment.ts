import { UserComment } from './user-comment';

export interface Comment {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: UserComment
}
