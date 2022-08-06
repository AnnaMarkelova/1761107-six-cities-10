import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../consts/authorization-status';
import { cities } from '../consts/cities';
import { City } from '../types/city';
import { Comment } from '../types/comment';
import { Hotel } from '../types/hotel';
import { User } from '../types/user';
import { loadComments, loadFavoritesHotels, loadHotels, loadUser, requireAuthorization, setCity, setDataLoadedStatus, setDefaultCity, setError, setHotelStatusLoaded } from './action';

type initialState = {
  city: City,
  hotels: Hotel[],
  favoritesHotels: Hotel[],
  comments: Comment[],
  authorizationStatus: AuthorizationStatus,
  user: User
  error: string | null,
  isDataLoading: boolean,
  isHotelStatusLoaded: boolean,
};

const initialState: initialState = {
  city: cities[0],
  hotels: [],
  favoritesHotels: [],
  comments: [],
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
  isDataLoading: false,
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
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
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
      state.isDataLoading = action.payload;
    })
    .addCase(setHotelStatusLoaded, (state, action) => {
      state.isHotelStatusLoaded = action.payload;
    });
});

