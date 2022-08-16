import { AuthorizationStatus } from '../consts/authorization-status.js';
import {store} from '../services/store/index.js';
import { City } from './city.js';
import { Comment } from './comment.js';
import { Hotel } from './hotel.js';
import { User } from './user.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  user: User | null,
  authorizationStatus: AuthorizationStatus,
  isDataLoading: boolean
};

export type FavoritesHotelsData = {
  favoritesHotels: Hotel[]
};

export type CommentsData = {
  comments: Comment[]
};

export type HotelsData = {
  hotels: Hotel[],
  currentHotel: Hotel | null,
  nearbyHotels: Hotel[]
};

export type CityData = {
  city: City
};
