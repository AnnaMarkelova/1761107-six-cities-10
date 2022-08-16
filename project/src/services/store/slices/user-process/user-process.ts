import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../../consts/api-route';
import { AuthorizationStatus } from '../../../../consts/authorization-status';
import { UserProcess } from '../../../../types/state';
import { checkAuthAction, fetchHotelAction, fetchHotelsAction, fetchHotelStatusFavoriteAction, fetchNearbyHotelsAction, fetchNewCommentAction, loginAction, logoutAction } from '../../api-actions';

const initialState: UserProcess = {
  user: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoading: false,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      })
      .addCase(fetchHotelsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchHotelsAction.fulfilled, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchHotelsAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchHotelAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchHotelAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
      })
      .addCase(fetchHotelAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchNearbyHotelsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchNearbyHotelsAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
      })
      .addCase(fetchNearbyHotelsAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchNewCommentAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchNewCommentAction.fulfilled, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchNewCommentAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchHotelStatusFavoriteAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchHotelStatusFavoriteAction.fulfilled, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchHotelStatusFavoriteAction.rejected, (state) => {
        state.isDataLoading = false;
      });
  }
});
