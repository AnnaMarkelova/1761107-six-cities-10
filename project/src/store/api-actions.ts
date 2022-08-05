import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { loadHotels, loadUser, redirectToRoute, requireAuthorization, setDataLoadedStatus, setError, setHotelStatusLoaded } from './action';
import { saveToken, dropToken } from '../services/token';
import { AuthorizationStatus } from '../consts/authorization-status';
import { APIRoute } from '../consts/api-route';
import { AuthData } from '../types/auth-data';
import { User } from '../types/user.js';
import { Hotel } from '../types/hotel.js';
import { store } from './index';
import { AppRoute } from '../consts/app-route';

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
  extra: AxiosInstance
}>(
  'data/fetchHotels',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setDataLoadedStatus(true));
    const { data } = await api.get<Hotel[]>(APIRoute.Hotels);
    dispatch(loadHotels(data));
    dispatch(setDataLoadedStatus(false));
  },
);

export const fetchHotelStatusAction = createAsyncThunk<void, { hotelId: number, status: number }, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchHotelStatus',
  async ({ hotelId, status }, { dispatch, extra: api }) => {
    dispatch(setHotelStatusLoaded(true));
    await api.post<Hotel>(`${APIRoute.Favorite}/${hotelId}/${status}`);
    dispatch(fetchHotelsAction());
    dispatch(setHotelStatusLoaded(false));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get(APIRoute.Login);
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
  extra: AxiosInstance
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<User>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(loadUser(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);
