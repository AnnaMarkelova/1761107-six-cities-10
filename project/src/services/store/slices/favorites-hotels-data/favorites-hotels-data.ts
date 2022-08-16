import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../../consts/api-route';
import { FavoritesHotelsData } from '../../../../types/state';
import { fetchFavoritesHotelsAction } from '../../api-actions';

const initialState: FavoritesHotelsData = {
  favoritesHotels: [],
};

export const favoritesHotelsData = createSlice({
  name: NameSpace.DataFavoritesHotels,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesHotelsAction.fulfilled, (state, action) => {
        state.favoritesHotels = action.payload;
      });
  }
});
