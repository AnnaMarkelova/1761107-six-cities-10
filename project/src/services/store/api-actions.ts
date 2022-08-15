import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state.js';
import { redirectToRoute } from './action';
import { saveToken, dropToken } from '../token';
import { APIRoute } from '../../consts/api-route';
import { AuthData } from '../../types/auth-data';
import { User } from '../../types/user.js';
import { Hotel } from '../../types/hotel.js';
import { AppRoute } from '../../consts/app-route';
import { Comment } from '../../types/comment.js';

export const fetchHotelsAction = createAsyncThunk<Hotel[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: {
    api: AxiosInstance
  }
}>(
  'data/fetchHotels',
  async (_arg, { dispatch, extra }) => {
    const { data } = await extra.api.get<Hotel[]>(APIRoute.Hotels);
    return data;
  },
);

export const fetchHotelAction = createAsyncThunk<Hotel, { hotelId: number }, {
  dispatch: AppDispatch,
  state: State,
  extra: {
    api: AxiosInstance
  }
}>(
  'data/fetchHotel',
  async ({ hotelId }, { extra }) => {
    const { data } = await extra.api.get<Hotel>(`${APIRoute.Hotels}/${hotelId}`);
    return data;
  },
);

export const fetchNearbyHotelsAction = createAsyncThunk<Hotel[], { hotelId: number }, {
  dispatch: AppDispatch,
  state: State,
  extra: {
    api: AxiosInstance
  }
}>(
  'data/fetchNearbyHotels',
  async ({ hotelId }, { extra }) => {
    const { data } = await extra.api.get<Hotel[]>(`${APIRoute.Hotels}/${hotelId}/nearby`);
    return data;
  },
);

export const fetchCommentsAction = createAsyncThunk<Comment[], { hotelId: number | undefined }, {
  dispatch: AppDispatch,
  state: State,
  extra: {
    api: AxiosInstance
  }
}>(
  'data/fetchComments',
  async ({ hotelId }, { extra }) => {
    const { data } = await extra.api.get<Comment[]>(`${APIRoute.Comments}/${hotelId}`);
    return data;
  },
);

export const fetchNewCommentAction = createAsyncThunk<void, { comment: string, rating: number, hotelId: number | undefined }, {
  dispatch: AppDispatch,
  state: State,
  extra: {
    api: AxiosInstance
  }
}>(
  'data/fetchNewComment',
  async ({ comment, rating, hotelId }, { extra }) => {
    await extra.api.post<Comment>(`${APIRoute.Comments}/${hotelId}`, { comment, rating });
  },
);

export const fetchFavoritesHotelsAction = createAsyncThunk<Hotel[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: {
    api: AxiosInstance
  }
}>(
  'data/fetchFavoritesHotels',
  async (_arg, { extra }) => {
    const { data } = await extra.api.get<Hotel[]>(APIRoute.Favorite);
    return data;
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
    await extra.api.post<Hotel>(`${APIRoute.Favorite}/${hotelId}/${status}`);
    dispatch(fetchHotelsAction());
    dispatch(fetchFavoritesHotelsAction());
  },
);

export const checkAuthAction = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: {
    api: AxiosInstance
  }
}>(
  'user/checkAuth',
  async (_arg, { extra }) => {
    const { data } = await extra.api.get(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<User, AuthData, {
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
    dispatch(redirectToRoute(AppRoute.Main));
    return data;
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
    dispatch(redirectToRoute(AppRoute.Main));
  },
);
