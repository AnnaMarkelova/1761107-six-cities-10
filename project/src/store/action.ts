import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../consts/app-route';
import { AuthorizationStatus } from '../consts/authorization-status';
import { City } from '../types/city';
import { Comment } from '../types/comment';
import { Hotel } from '../types/hotel';
import { User } from '../types/user';

export const setCity = createAction(
  'mainPage/setCity',
  (value: City) => (
    {
      payload: value,
    }
  ));

export const setDefaultCity = createAction('mainPage/setDefaultCity');

export const loadHotels = createAction<Hotel[]>('data/loadHotels');

export const loadHotel = createAction<Hotel>('data/loadHotel');

export const loadFavoritesHotels = createAction<Hotel[]>('data/loadFavoritesHotels');

export const loadComments = createAction<Comment[]>('data/loadComments');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const loadUser = createAction<User>('data/loadUser');

export const setError = createAction<string | null>('setError');

export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');

export const setHotelStatusLoaded = createAction<boolean>('data/setHotelStatusLoaded');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
