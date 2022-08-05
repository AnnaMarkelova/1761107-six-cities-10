import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../consts/authorization-status';
import { cities } from '../consts/cities';
import { City } from '../types/city';
import { Hotel } from '../types/hotel';
import { User } from '../types/user';
import { loadFavoritesHotels, loadHotels, loadUser, requireAuthorization, setCity, setDataLoadedStatus, setDefaultCity, setError, setHotelStatusLoaded } from './action';

type initialState = {
  city: City,
  hotels: Hotel[],
  favoritesHotels: Hotel[],
  authorizationStatus: AuthorizationStatus,
  user: User
  error: string | null,
  isDataLoaded: boolean,
  isHotelStatusLoaded: boolean,
};

const initialState: initialState = {
  city: cities[0],
  hotels: [],
  favoritesHotels: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  user: {
    avatarUrl: '',
    email: '',
    id: 0,
    isPro: false,
    name: '',
    token: '',
  },
  error: null,
  isDataLoaded: false,
  isHotelStatusLoaded: false,
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
    .addCase(loadFavoritesHotels, (state, action) => {
      state.favoritesHotels = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(setHotelStatusLoaded, (state, action) => {
      state.isHotelStatusLoaded = action.payload;
    });
});

