import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../../consts/api-route';
import { FavoritesHotelsData } from '../../../../types/state';
import { fetchFavoritesHotelsAction, fetchHotelStatusFavoriteAction } from '../../api-actions';

const initialState: FavoritesHotelsData = {
  favoritesHotels: [],
  isHotelStatusFavoriteLoading: false
};

export const favoritesHotelsData = createSlice({
  name: NameSpace.DataFavoritesHotels,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesHotelsAction.fulfilled, (state, action) => {
        state.favoritesHotels = action.payload;
      })
      .addCase(fetchHotelStatusFavoriteAction.pending, (state) => {
        state.isHotelStatusFavoriteLoading = true;
      })
      .addCase(fetchHotelStatusFavoriteAction.fulfilled, (state) => {
        state.isHotelStatusFavoriteLoading = false;
      })
      .addCase(fetchHotelStatusFavoriteAction.rejected, (state) => {
        state.isHotelStatusFavoriteLoading = false;
      });
  }
});
