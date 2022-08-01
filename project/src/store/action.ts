import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';

export const setCity = createAction(
  'mainPage/setCity',
  (value: City) => (
    {
      payload: value,
    }
  ));

export const setDefaultCity = createAction('mainPage/setDefaultCity');


