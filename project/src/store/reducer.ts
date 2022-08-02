import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../consts/authorization-status';
import { cities } from '../consts/cities';
import { City } from '../types/city';
import { Hotel } from '../types/hotel';
import { loadHotels, requireAuthorization, setCity, setDefaultCity, setError } from './action';

type initialState = {
  city: City,
  hotels: Hotel[],
  authorizationStatus: AuthorizationStatus,
  error: string | null,
};

const initialState: initialState = {
  city: cities[0],
  hotels: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setDefaultCity, (state) => {
      state.city = initialState.city;
      state.hotels = initialState.hotels;
    })
    .addCase(loadHotels, (state, action) => {
      state.hotels = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

