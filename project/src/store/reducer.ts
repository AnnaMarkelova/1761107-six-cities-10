import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../consts/authorization-status';
import { cities } from '../consts/cities';
import { City } from '../types/city';
import { Comment } from '../types/comment';
import { Hotel } from '../types/hotel';
import { User } from '../types/user';
import { loadComments, loadFavoritesHotels, loadHotels, loadNearbyHotels, loadUser, requireAuthorization, setCity, setCurrentHotel, setDataLoadedStatus, setDefaultCity, setError, setHotelStatusFavoriteLoading } from './action';

type initialState = {
  city: City,
  hotels: Hotel[],
  currentHotel: Hotel | null,
  favoritesHotels: Hotel[],
  nearbyHotels: Hotel[],
  comments: Comment[],
  authorizationStatus: AuthorizationStatus,
  user: User | null,
  error: string | null,
  isDataLoading: boolean,
  isHotelStatusFavoriteLoading: boolean,
};

const initialState: initialState = {
  city: cities[0],
  hotels: [],
  currentHotel: null,
  favoritesHotels: [],
  nearbyHotels: [],
  comments: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  error: null,
  isDataLoading: false,
  isHotelStatusFavoriteLoading: false,
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
    .addCase(setCurrentHotel, (state, action) => {
      state.currentHotel = action.payload;
    })
    .addCase(loadFavoritesHotels, (state, action) => {
      state.favoritesHotels = action.payload;
    })
    .addCase(loadNearbyHotels, (state, action) => {
      state.nearbyHotels = action.payload;
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
    .addCase(setHotelStatusFavoriteLoading, (state, action) => {
      state.isHotelStatusFavoriteLoading = action.payload;
    });
});

