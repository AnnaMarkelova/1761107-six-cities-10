import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../consts/authorization-status';
import { cities } from '../../consts/cities';
import { City } from '../../types/city';
import { Comment } from '../../types/comment';
import { Hotel } from '../../types/hotel';
import { User } from '../../types/user';
import { loadComments, loadFavoritesHotels, loadHotels, loadNearbyHotels, loadUser, postComment, requireAuthorization, setCity, setCommentLoading, setCurrentHotel, setDataLoadingStatus, setDefaultCity, setError, setHotelStatusFavoriteLoading } from './action';

type initialStateType = {
  city: City,
  hotels: Hotel[],
  currentHotel: Hotel | null,
  favoritesHotels: Hotel[],
  nearbyHotels: Hotel[],
  comments: Comment[],
  newComment: Comment | null,
  authorizationStatus: AuthorizationStatus,
  user: User | null,
  error: string | null,
  isDataLoading: boolean,
  isHotelStatusFavoriteLoading: boolean,
  isCommentLoading: boolean,
};

const initialState: initialStateType = {
  city: cities[0],
  hotels: [],
  currentHotel: null,
  favoritesHotels: [],
  nearbyHotels: [],
  comments: [],
  newComment: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  error: null,
  isDataLoading: false,
  isHotelStatusFavoriteLoading: false,
  isCommentLoading: false,
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
    .addCase(postComment, (state, action) => {
      state.newComment = action.payload;
    })
    .addCase(setCommentLoading, (state, action) => {
      state.isCommentLoading = action.payload;
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
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(setHotelStatusFavoriteLoading, (state, action) => {
      state.isHotelStatusFavoriteLoading = action.payload;
    });
});

