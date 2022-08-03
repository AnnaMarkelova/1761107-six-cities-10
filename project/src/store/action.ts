import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../consts/authorization-status';
import { City } from '../types/city';
import { Hotel } from '../types/hotel';

export const setCity = createAction(
  'mainPage/setCity',
  (value: City) => (
    {
      payload: value,
    }
  ));

export const setDefaultCity = createAction('mainPage/setDefaultCity');

export const loadHotels = createAction<Hotel[]>('data/loadHotels');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('setError');

export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');
