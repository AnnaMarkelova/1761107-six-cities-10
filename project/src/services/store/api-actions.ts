import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state.js';
import { loadComments, loadFavoritesHotels, loadHotels, loadNearbyHotels, loadUser, redirectToRoute, requireAuthorization, setCommentLoading, setCurrentHotel, setDataLoadingStatus, setError, setHotelStatusFavoriteLoading } from './action';
import { saveToken, dropToken } from '../token';
import { AuthorizationStatus } from '../../consts/authorization-status';
import { APIRoute } from '../../consts/api-route';
import { AuthData } from '../../types/auth-data';
import { User } from '../../types/user.js';
import { Hotel } from '../../types/hotel.js';
import { store } from './index';
import { AppRoute } from '../../consts/app-route';
import { Comment } from '../../types/comment.js';

const TIMEOUT_SHOW_ERROR = 5000;

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchHotelsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: {
    api: AxiosInstance
  }
}>(
  'data/fetchHotels',
  async (_arg, { dispatch, extra }) => {
    dispatch(setDataLoadingStatus(true));
    const { data } = await extra.api.get<Hotel[]>(APIRoute.Hotels);
    dispatch(loadHotels(data));
    dispatch(setDataLoadingStatus(false));
  },
);

export const fetchHotelAction = createAsyncThunk<void, { hotelId: number }, {
  dispatch: AppDispatch,
  state: State,
  extra: {
    api: AxiosInstance
  }
}>(
  'data/fetchHotel',
  async ({ hotelId }, { dispatch, extra }) => {
    dispatch(setDataLoadingStatus(true));
    const {data} = await extra.api.get<Hotel>(`${APIRoute.Hotels}/${hotelId}`);
    dispatch(setCurrentHotel(data));
    dispatch(setDataLoadingStatus(false));
  },
);

export const fetchFavoritesHotelsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: {
    api: AxiosInstance
  }
}>(
  'data/fetchFavoritesHotels',
  async (_arg, { dispatch, extra }) => {
    const { data } = await extra.api.get<Hotel[]>(APIRoute.Favorite);
    dispatch(loadFavoritesHotels(data));
  },
);

export const fetchNearbyHotelsAction = createAsyncThunk<void, { hotelId: number }, {
  dispatch: AppDispatch,
  state: State,
  extra: {
    api: AxiosInstance
  }
}>(
  'data/fetchNearbyHotels',
  async ({ hotelId }, { dispatch, extra }) => {
    dispatch(setDataLoadingStatus(true));
    const { data } = await extra.api.get<Hotel[]>(`${APIRoute.Hotels}/${hotelId}/nearby`);
    dispatch(loadNearbyHotels(data));
    dispatch(setDataLoadingStatus(false));
  },
);

export const fetchCommentsAction = createAsyncThunk<void, { hotelId: number | undefined }, {
  dispatch: AppDispatch,
  state: State,
  extra: {
    api: AxiosInstance
  }
}>(
  'data/fetchComments',
  async ({ hotelId }, { dispatch, extra }) => {
    dispatch(setDataLoadingStatus(true));
    const { data } = await extra.api.get<Comment[]>(`${APIRoute.Comments}/${hotelId}`);
    dispatch(loadComments(data));
    dispatch(setDataLoadingStatus(false));
  },
);

export const fetchNewCommentAction = createAsyncThunk<void, { comment: string, rating: number, hotelId: number | undefined}, {
  dispatch: AppDispatch,
  state: State,
  extra: {
    api: AxiosInstance
  }
}>(
  'data/fetchNewComment',
  async ({ comment, rating, hotelId }, { dispatch, extra }) => {
    dispatch(setCommentLoading(true));
    await extra.api.post<Comment>(`${APIRoute.Comments}/${hotelId}`, {comment, rating});
    dispatch(setCommentLoading(false));
  },
);

export const fetchHotelStatusFavoriteAction = createAsyncThunk<void, { hotelId: number, status: number }, {
  dispatch: AppDispatch,
  state: State,
  extra: {
    api: AxiosInstance
  }
}>(
  'data/fetchHotelStatusFavorite',
  async ({ hotelId, status }, { dispatch, extra }) => {
    dispatch(setHotelStatusFavoriteLoading(true));
    await extra.api.post<Hotel>(`${APIRoute.Favorite}/${hotelId}/${status}`);
    dispatch(fetchHotelsAction());
    dispatch(fetchFavoritesHotelsAction());
    dispatch(setHotelStatusFavoriteLoading(false));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: {
    api: AxiosInstance
  }
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra }) => {
    try {
      const { data } = await extra.api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(loadUser(data));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: {
    api: AxiosInstance
  }
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra }) => {
    const { data } = await extra.api.post<User>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(loadUser(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: {
    api: AxiosInstance
  }
}>(
  'user/logout',
  async (_arg, { dispatch, extra }) => {
    await extra.api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);
